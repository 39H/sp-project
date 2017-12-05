const Joi = require('joi');
const Model = require('model');
const { User, Work, Attachment } = Model;
const fs = require('fs');



exports.upload = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(403).json({msg: '유효하지 않은 사용자입니다.'});
        }

        const {originalname: fileName, path: filePath} = req.file;
        const result = await Attachment.uploadFile({fileName ,filePath, UserId: user.id});

        const { id } = result;
        res.json({id, fileName, filePath});
    } catch(error) {
        res.status(500).json({error});
    }
    
    /*Work.findById(workid).then(work =>{
        Attachment.upload(file.filename, file.path, work); 
    })
    .catch(error => {
        return reset.stauts(403).json();
    });
    return res.status(400).json();*/
};

exports.setWorkId = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }
    
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(403).json({msg: '유효하지 않은 사용자입니다.'});
        }

        const { files, WorkId } = req.body;

        for(let file of files) {
            const { id } = file;
            const attachment = await Attachment.findById(id);
            if(attachment.UserId !== user.id) {
                return res.status(403).json({msg: '이미지를 업로드한 사용자가 아닙니다.'});
            }
            await attachment.update({WorkId});
        }
        res.json();
    } catch(error) {
        res.status(500).json({error});
    }
};

exports.uploadThumbnail = (req, res) => {
    const { image } = req.body;

    const fileExtension = image.match(/data:image\/(.*);/);
    if(!fileExtension) {
        return res.status(400).json({msg: '유효하지 않은 이미지입니다.'});
    }
    const data = image.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(data, 'base64');
    const name = new Date().valueOf() + '.' + fileExtension[1];
    fs.writeFile('./thumbnails/' + name, buf, () => {});
    res.json({url: '/thumbnails/' + name})
};

exports.uploadPhoto = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }
    const { image } = req.body;

    const fileExtension = image.match(/data:image\/(.*);/);
    if(!fileExtension) {
        return res.status(400).json({msg: '유효하지 않은 이미지입니다.'});
    }
    const data = image.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer(data, 'base64');
    const name = new Date().valueOf() + '.' + fileExtension[1];

    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({msg: '유효하지 않은 사용자입니다.'});
        }
        fs.writeFile('./photos/' + name, buf, () => {});
        await user.update({photo: '/photos/' + name});
        res.json({url: '/photos/' + name})
    } catch(error) {
        res.status(500).json({error});
    }
};


/*exports.get = (req, res) => {
    const workid = req.params.work_id;
    
    Attachment.findall(workid).then(attachments => {
        console.log(attachments); //array object
        return res.status(400).json(attachments);
    })
}*/

exports.get = async (req, res) => {
    const workid = req.params.work_id;

    try {
        const work = await Work.findById(workid);
        if(!work) {
            return res.status(404).json({msg: '유효하지 않은 작품입니다.'});
        }

        const files = await work.getAttachments({order: [['id','ASC']]});
        const result = [];

        for(let file of files) {
            const { id, fileName, filePath } = file;
            result.push({id, fileName, filePath});
        }

        res.json(result);
    } catch(error) {
        res.json({error});
    }
};