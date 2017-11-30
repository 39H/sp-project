const Joi = require('joi');
const Model = (require('model'));
const User = Model.User;
const Work = Model.Work;

// 최신순으로 작품 목록

// 추천순으로 작품 목록

// 유저별로 작품 목록 (해당 유저가 업로드한 작품)

// 작품 아이디, 제목, 썸네일, (작품 내용), 작품 업로드한 유저의 displayName, userName
/*
exports.listByRecent = (req, res) => {
    Work.listbyRecent().then(list => {
        res.status(400).json(list);
    }).catch(err => { res.status(403).json(err)});
};
*/

exports.listByRecent = async (req, res) => {
    try {
        const works = await Work.findAll({order: [['createdAt','DESC']]});

        const results = [];
        await Promise.all(works.map(async work => {
            const { id, subject, thumbnail, likes, createdAt, updatedAt } = work;
            const creator = await work.getUser();
            const { displayName, userName } = creator;

            results.push({ id, subject, thumbnail, likes, createdAt, updatedAt, displayName, userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    }
};

/*exports.listByLikes = (req, res) => {
    Work.listbyLikes().then(list => {
        res.status(400).json(list);
    }).catch(err => { res.status(403).json(err)});

};
*/

exports.listByLikes = async (req, res) => {
    try {
        const works = await Work.findAll({order: [['likes','DESC']]});

        const results = [];
        await Promise.all(works.map(async work => {
            const { id, subject, thumbnail, likes, createdAt, updatedAt } = work;
            const creator = await work.getUser();
            const { displayName, userName } = creator;

            results.push({ id, subject, thumbnail, likes, createdAt, updatedAt, displayName, userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.listByUser = async (req, res) => {
    const username = req.params.user_name;

    try {
        const user = await User.findByUserName(username);

        const works = await user.getWorks({order: [['createdAt','DESC']]});
        const results = [];
        await Promise.all(works.map(async work => {
            const { id, subject, thumbnail, likes, createdAt, updatedAt } = work;
            const { displayName, userName } = user;

            results.push({ id, subject, thumbnail, likes, createdAt, updatedAt, displayName, userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    }
};
