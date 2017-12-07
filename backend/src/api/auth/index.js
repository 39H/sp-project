const express = require('express');
const auth = express.Router();
const authCtrl = require('./auth.ctrl');

auth.post('/logout', authCtrl.logout);
//auth.get('/edit/:email', authCtrl.forgetpass); 이메일 전달 기능. 추후 완성
auth.post('/register', authCtrl.register); //@body : email, password, displayName, userName
auth.post('/login', authCtrl.login); //@body : email, password
auth.put('/edit', authCtrl.edit); //@body : userName, new_password
auth.delete('/edit', authCtrl.delete); //@body : userName 
auth.get('/check', authCtrl.check); //로그인 체크

auth.post('/password', authCtrl.forgotPassword);
auth.patch('/password', authCtrl.changeForgotPassword);

module.exports = auth;
