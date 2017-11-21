const express = require('express');
const auth = express.Router();
const authCtrl = require('./auth.ctrl');

auth.get('/test', authCtrl.test);
auth.get('/logout', authCtrl.logout);
//auth.get('/edit/:email', authCtrl.forgetpass); 이메일 전달 기능. 추후 완성
auth.post('/register', authCtrl.register); //@body : email, password, displayName, userName
auth.post('/login', authCtrl.login); //@body : email, password
auth.put('/edit', authCtrl.edit); //@body : userName, new_password
auth.delete('/edit', authCtrl.delete); //@body : userName 


module.exports = auth;
