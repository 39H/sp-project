const express = require('express');
const list = express.Router();
const listCtrl = require('./list.ctrl');

list.get('/recent', listCtrl.listByRecent);
list.get('/likes', listCtrl.listByLikes);
list.get('/subscriptions', listCtrl.listBySubscriptions);
list.get('/user/:user_name', listCtrl.listByUser);

module.exports = list;
