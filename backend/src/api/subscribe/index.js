const express = require('express');
const subscribe = express.Router();
const subscribeCtrl = require('./subscribe.ctrl');

subscribe.get('/', subscribeCtrl.getCreator);
<<<<<<< HEAD
subscribe.get('/subscriber', subscribeCtrl.getSubscriber);
=======
subscribe.get('/tome', subscribeCtrl.getSubscriber);
>>>>>>> a60df367764dfb35ba7c3f3f774020d206a74540
subscribe.post('/:user_name', subscribeCtrl.subscribe);
subscribe.delete('/:user_name', subscribeCtrl.unsubscribe);


module.exports = subscribe;
