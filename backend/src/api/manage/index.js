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

module.exports = manage;
