const Joi = require('joi');
const User = (require('model')).User;
const Work = (require('model')).Work;
const Attachment = (require('model')).Attachment;

exports.upload = (req, res) => {
    const file = req.file;
    console.log(file);
    const workid = req.params.work_id;

    
    Work.findById(workid).then(work =>{
        Attachment.upload(file.filename, file.path, work); 
    })
    .catch(error => {
        return reset.stauts(403).json();
    });
    return res.status(400).json();
}

exports.get = (req, res) => {
    const workid = req.params.work_id;
    
    Attachment.findall(workid).then(attachments => {
        console.log(attachments); //array object
        return res.status(400).json(attachments);
    })
}
