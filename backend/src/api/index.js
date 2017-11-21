const express = require('express');
const api = express.Router();

const auth = require('./auth');
const user = require('./user');
const list = require('./list');
const work = require('./work');
const subscribe = require('./subscribe');
const like = require('./like');
const community = require('./community');
const attachment = require('./attachment');

api.use('/auth', auth);
api.use('/user', user);
api.use('/list', list);
api.use('/work', work);
api.use('/subscribe', subscribe);
api.use('/like', like);
api.use('/community', community);
api.use('/attachment', attachment);

module.exports = api;