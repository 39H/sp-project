const express = require('express');
const manage = express.Router();
const manageCtrl = require('./manage.ctrl');

// 전체 게시글 목록
manage.get('/thread', manageCtrl.getAllThreads);
// 전체 댓글 목록
manage.get('/comment', manageCtrl.getAllComments);

// 내가 쓴 게시글 목록
manage.get('/thread/mine', manageCtrl.getMyThreads);

// 내가 쓴 댓글 목록
manage.get('/comment/mine', manageCtrl.getMyComments);

//프로필이미지 업로드
manage.post('/profile/:user_id', manageCtrl.profileupload.single('img'), manageCtrl.profile);

//섬네일이미지업로드
manage.post('/thumbnail/:work_id', manageCtrl.thumbnailupload.single('img'), manageCtrl.thumbnail);

module.exports = manage;
