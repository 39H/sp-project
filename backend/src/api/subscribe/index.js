const express = require('express');
const subscribe = express.Router();
const subscribeCtrl = require('./subscribe.ctrl');

subscribe.get('/', subscribeCtrl.getCreator);
subscribe.get('/subscriber', subscribeCtrl.getSubscriber);
subscribe.post('/:user_name', subscribeCtrl.subscribe);
subscribe.delete('/:user_name', subscribeCtrl.unsubscribe);


module.exports = subscribe;