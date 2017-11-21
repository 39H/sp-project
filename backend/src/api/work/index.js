const express = require('express');
const work = express.Router();
const workCtrl = require('./work.ctrl');

work.get('/:work_id', workCtrl.getWork);
work.post('/', workCtrl.uploadWork);
work.delete('/:work_id', workCtrl.deleteWork);
//work.patch('/:work_id', workCtrl.patch);


module.exports = work;