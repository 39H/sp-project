const express = require('express');
const user = express.Router();
const userCtrl = require('./user.ctrl');

user.get('/:user_name', userCtrl.view);


module.exports = user;