const express = require('express');
const attachment = express.Router();
const attachmentCtrl = require('./attachment.ctrl');
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    }),
  });

attachment.get('/:work_id', attachmentCtrl.get); // 작품의 첨부 파일들 조회
attachment.post('/:work_id', upload.single('img'), attachmentCtrl.upload); // 작품에 파일 첨부
module.exports = attachment;
