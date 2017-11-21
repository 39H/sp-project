const express = require('express');
const mine = express.Router();
const mineCtrl = require('./mine.ctrl');

mine.get('/test', mineCtrl.test);

module.exports = mine;