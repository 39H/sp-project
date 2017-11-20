const express = require('express');
const community = express.Router();
const communityCtrl = require('./community.ctrl');

const thread = require('./thread');
const mine = require('./mine');

community.use('/thread', thread);
community.use('/mine', mine);

module.exports = community;