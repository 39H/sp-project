const express = require('express');
const attachment = express.Router();
const attachmentCtrl = require('./attachment.ctrl');
const multer = require('multer');

const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

attachment.post('/', upload.single('img'), attachmentCtrl.upload); // 파일 업로드
attachment.patch('/', attachmentCtrl.setWorkId);

attachment.post('/thumbnail', attachmentCtrl.uploadThumbnail);
attachment.post('/photo', attachmentCtrl.uploadPhoto);

attachment.get('/:work_id', attachmentCtrl.get); // 작품의 첨부 파일들 조회
/*attachment.post('/:work_id', upload.single('img'), attachmentCtrl.upload); // 작품에 파일 첨부*/
module.exports = attachment;
