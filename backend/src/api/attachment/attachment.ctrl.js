const Joi = require('joi');
const User = (require('model')).User;
const Work = (require('model')).Work;
const Attachment = (require('model')).Attachment;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

exports.Attachupload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/attachments/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf()  + path.extname(file.originalname));
      }
    }),
  });



exports.upload = (req, res) => {
    const file = req.file;
    const workid = req.params.work_id;

    Work.findById(workid).then(work =>{
        Attachment.upload(file.filename, file.path, work).then(Attach => {
            return res.status(200).json({msg: "upload OK", attachment_id : Attach.id, file_url : Attach.filePath})
            .catch(error => {return res.status(403).json(); })
        })
    })
    .catch(error => {
        return res.status(403).json();
    });
    return res.status(400).json();
}

exports.get = (req, res) => {
    const workid = req.params.work_id;
    
    Attachment.findall(workid).then(attachments => {
        return res.status(200).json(attachments);
    })
};

exports.delete = (req, res) => {
    const attachid = req.params.attach_id;
    Attachment.findById(attachid).then(attach => {
            Work.findById(attach.WorkId).then(work => {
                User.findById(work.UserId).then(user => {
                   // if (req.user.id != user.id) return res.status(403).json({msg : "토큰 발행 당시 id와 현재 요청 id 일치 하지 않음"}); 
                    return Attachment.delete(attachid).then(attach => {fs.unlink(attach.filePath, function (err) { if (err) throw err; console.log('successfully deleted' + ' id : ' + attach.id + ' ' + attach.filePath); });
                    }).catch(err => {res.status(400).json();})
                }).catch(err => { return res.status(400).json();})
            }).catch(err => { return res.status(400).json();}) 
        }).catch(err => { return res.status(400).json();})
}
