const express = require('express');
const community = express.Router();
const threadCtrl = require('./thread.ctrl');
const commentCtrl = require('./comment.ctrl');

const mine = require('./mine');

community.use('/mine', mine);

// 전체 게시글 목록
community.get('/', threadCtrl.getAllThreads);
// 전체 댓글 목록
community.get('/comment', commentCtrl.getAllComments);


// 게시글 목록
community.get('/:user_name', threadCtrl.getThreads);
community.post('/:user_name', threadCtrl.writeThread);

// 게시글
community.get('/:user_name/:thread_id', threadCtrl.getThread);
community.patch('/:user_name/:thread_id', threadCtrl.patchThread);
community.delete('/:user_name/:thread_id', threadCtrl.deleteThread);

// 댓글 목록
community.get('/:user_name/:thread_id/comment', commentCtrl.getComments);
community.post('/:user_name/:thread_id/comment', commentCtrl.writeComment);

// 댓글
community.get('/:user_name/:thread_id/comment/:comment_id', commentCtrl.getComment);
community.patch('/:user_name/:thread_id/comment/:comment_id', commentCtrl.patchComment);
community.delete('/:user_name/:thread_id/comment/:comment_id', commentCtrl.deleteComment);

module.exports = community;