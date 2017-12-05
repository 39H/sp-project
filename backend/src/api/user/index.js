const express = require('express');
const user = express.Router();
const userCtrl = require('./user.ctrl');

user.get('/', userCtrl.getMyInfo);
user.patch('/', userCtrl.patchProfile);

user.get('/:user_name', userCtrl.view);
user.put('/:user_name', userCtrl.edit);


module.exports = user;
