const express = require('express');
const thread = express.Router();
const threadCtrl = require('./thread.ctrl');

const comment = require('./comment');

thread.use('/comment', comment);

module.exports = thread;