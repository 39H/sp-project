const express = require('express');
const community = express.Router();
const communityCtrl = require('./community.ctrl');

const thread = require('./thread');
const mine = require('./mine');

community.use('/thread', thread);
community.use('/mine', mine);

community.get('/:user_name', communityCtrl.getThreads);
community.post('/:user_name', communityCtrl.writeThread);

module.exports = community;