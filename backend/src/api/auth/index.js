const express = require('express');
const auth = express.Router();
const authCtrl = require('./auth.ctrl');

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.post('/logout', authCtrl.logout); // 로그아웃 그냥 get 으로?? 아니면 all?

module.exports = auth;