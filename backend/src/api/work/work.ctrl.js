const Joi = require('joi');
const rp = require('request-promise');
const Model = require('model');
const { User, Work } = Model;

const { YOUTUBE_API_KEY: apiKey } = process.env;

// 작품 등록
exports.uploadWork = async (req, res) => {
    const { user } = req;

    if(!user) return res.status(403).json({msg: '먼저 로그인 하세요.'});

    const body = req.body;
    // subject, workType, 
    // todo: workType 검사, workURL 검사.. (동영상일땐 유투브 regex), 첨부파일 어케할지 -> attachment api로 따로 뻄, Joi 스키마 완성,
    // thumbnail은 자동 생성? (유투브 -> api이용, 첨부파일 -> 업로드시..)

    const {subject, workType, workURL, content } = body;

    if(workType === 'image') {
        const schema = Joi.object({
            subject: Joi.string().required(),
            workType: Joi.string().required(),
            workURL: Joi.string().uri(),
            content: Joi.string()
        });

        const result = Joi.validate(body, schema);

        if(result.error) {
            return res.status(400).json(result.error);
        }

        try {

        } catch(error) {
            res.status(500).json(error);
        }
    } else if (workType === 'video') {
        const schema = Joi.object({
            subject: Joi.string().required(),
            workType: Joi.string().required(),
            workURL: Joi.string().uri().regex(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i).required(),
            content: Joi.string()
        });

        const result = Joi.validate(body, schema);

        if(result.error) {
            return res.status(400).json(result.error);
        }


        const match = workURL.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
        const videoId = match[1];

        try {
            const repos = JSON.parse(await rp('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+videoId+'&key='+apiKey));
            const thumbnail = repos.items[0].snippet.thumbnails.medium.url;

            const uploaded = await Work.uploadWork({subject, workType, workURL: 'https://www.youtube.com/embed/'+videoId, thumbnail, content, UserId:user.id});
            res.json(uploaded);
        } catch(error) {
            res.status(500).json(error);
        }
    } else if (workType === 'text') {
        const schema = Joi.object({
            subject: Joi.string().required(),
            workType: Joi.string().required(),
            workURL: Joi.string().uri(),
            content: Joi.string().required()
        });

        const result = Joi.validate(body, schema);

        if(result.error) {
            return res.status(400).json(result.error);
        }

        try {
            
        } catch(error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(403).json('유효하지 않은 작품 타입입니다.');
    }
};


exports.getWork = async (req, res) => {
    const workid = req.params.work_id;

    try {
        const work = await Work.findById(workid);
        if(!work) return res.status(404).json({msg: '해당 작품을 찾지 못했습니다.'});

        const {id, subject, workType, workURL, thumbnail, content, likes, createdAt, updatedAt} = work;
        const creator = await work.getUser();
        const { userName, displayName, photo } = creator;

        res.json({id, subject, workType, workURL, thumbnail, content, likes, createdAt, updatedAt, userName, displayName, photo});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteWork = (req, res) => {
    const { user } = req;
    const workId = req.params.work_id;

    if(!user) return res.status(403).json();

    Work.findById(workId).then(work => {
        if(!work) return res.status(404).json();
        
        if(user.id != work.UserId) return res.status(403).json({msg: '작품을 등록한 사용자가 아닙니다.'});
        work.delete().then(deleted => {
            res.json({workId});
        });
    }).catch(error => {
        res.status(500).json(error);
    });
};
