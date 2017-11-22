const express = require('express');
const list = express.Router();
const listCtrl = require('./list.ctrl');

list.get('/recent', listCtrl.listByRecent);
list.get('/likes', listCtrl.listByLikes);

module.exports = list;
