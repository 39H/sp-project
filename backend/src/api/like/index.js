const express = require('express');
const like = express.Router();
const likeCtrl = require('./like.ctrl');

like.get('/:work_id', likeCtrl.getLiked);
like.post('/:work_id', likeCtrl.like);
like.delete('/:work_id', likeCtrl.dislike);

module.exports = like;