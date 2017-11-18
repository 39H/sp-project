const express = require('express');
const auth = express.Router();

auth.get('/', (req, res) => {
    res.send('here is auth');
});

module.exports = auth;