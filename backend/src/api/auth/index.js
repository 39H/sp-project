const express = require('express');
const auth = express.Router();
const authCtrl = require('./auth.crtl');

auth.get('/test', authCtrl.test);
auth.post('/register', authCtrl.register);

module.exports = auth;