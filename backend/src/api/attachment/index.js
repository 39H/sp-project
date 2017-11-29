const express = require('express');
const attachment = express.Router();
const attachmentCtrl = require('./attachment.ctrl');



attachment.get('/:work_id', attachmentCtrl.get); // 작품의 첨부 파일들 조회
attachment.post('/:work_id', attachmentCtrl.Attachupload.single('img'), attachmentCtrl.upload); // 작품에 파일 첨부
attachment.delete('/:attach_id', attachmentCtrl.delete);
//attachment.delete('/all/:work_id', attachmentCtrl.alldelete);

module.exports = attachment;
