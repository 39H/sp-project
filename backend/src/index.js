// 환경 변수는 .env 파일에서 설정
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const api = require('./api');

// 환경 변수 설정
const {
    PORT: port
} = process.env;

app.use(bodyParser.json());

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});