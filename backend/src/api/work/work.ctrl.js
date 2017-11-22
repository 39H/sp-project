const Joi = require('joi');
const Model = require('model');
const User = Model.User;
const Work = Model.Work;

exports.getWork = (req, res) => {
    const body = req.body;
    const workId = req.params.work_id;
    
    // subject, workType, workURL, (thumbnail), conetent, likes, createdAt, updatedAt, UserId-> UserName...?...
    Work.findById(workId).then(work => {
        if(!work) return res.status(404).json();

        const { subject, workType, workURL, thumbnail, content, likes, createdAt, updatedAt, UserId } = work;
    }).catch(error => {
        res.status(500).json(error);
    });
};



exports.uploadWork = (req, res) => {
    const { user } = req;

    if(!user) return res.status(403).json();

    const body = req.body;
    // subject, workType, 
    // todo: workType 검사, workURL 검사.. (동영상일땐 유투브 regex), 첨부파일 어케할지 -> attachment api로 따로 뻄, Joi 스키마 완성,
    // thumbnail은 자동 생성? (유투브 -> api이용, 첨부파일 -> 업로드시..)
    const schema = Joi.object({
        subject: Joi.string().required(),
        workType: Joi.number(),
        workURL: Joi.string().uri(),
        content: Joi.string()
    });

    User.findById(user.id).then(User => {
    if(user.id != User.id) return res.status(403).json();
    const {subject,  workType, workURL, thumbnail, content } = body;
    Work.upload({subject,  workType, workURL, thumbnail, content, User});
    }
    )
};


exports.getWork = (req, res) => {
    const workid = req.params.work_id;

    Work.findById(workid).then(work => {
        
    // 해당 work 없음
    if(!work) return res.status(404).json();
                
     const {subject,  workType, workURL, thumbnail, content, Liker, Attachments, User} = work;
     const result = {subject,  workType, workURL, thumbnail, content, Liker, Attachments, User};
      res.json(result);
    }
    )
};

exports.deleteWork = (req, res) => {
    const { user } = req;
    const workId = req.params.work_id;

    if(!user) return res.status(403).json();

    Work.findById(workId).then(work => {
        if(!work) return res.status(404).json();
        
        if(user.id != work.UserId) return res.status(403).json();
        work.delete().then(deleted => {
            res.json({workId});
        });
    }).catch(error => {
        res.status(500).json(error);
    });
};
