// 환경 변수는 .env 파일에서 설정
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

const api = require('./api');
const jwtMiddleware = require('lib/middlewares/jwt');

// 환경 변수 설정
const {
    PORT: port
} = process.env;

app.use(bodyParser.json({limit: '5mb'}));
app.use(cookieParser());

app.use(jwtMiddleware);

app.use('/', express.static(path.join(__dirname, '../../frontend/build')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/thumbnails', express.static(path.join(__dirname, '../thumbnails')));
app.use('/photos', express.static(path.join(__dirname, '../photos')));

app.use('/api', api);

app.get('*', (req, res, next) => {
    if(req.path.split('/')[1] === 'static') return next();
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});