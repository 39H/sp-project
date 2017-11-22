const Model = require('model');
const { User, Work } = Model;

exports.getLiked = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인을 하세요.'});
    }

    const workId = req.params.work_id;
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(403).json({msg: '유효하지 않은 사용자입니다.'});
        }
        const work = await Work.findById(workId);
        if(!work) {
            return res.status(404).json({msg: '존재하지 않는 작품입니다.'});
        }

        const liked = await work.hasLiker(user);
        res.json({liked});
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.like = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인을 하세요.'});
    }

    const workId = req.params.work_id;
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(403).json({msg: '유효하지 않은 사용자입니다.'});
        }
        const work = await Work.findById(workId);
        if(!work) {
            return res.status(404).json({msg: '존재하지 않는 작품입니다.'});
        }

        await work.addLiker(user);
        work.likes = await work.countLiker();
        await work.save();
        res.json({likes: work.likes});
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.dislike = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인을 하세요.'});
    }

    const workId = req.params.work_id;
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(403).json({msg: '유효하지 않은 사용자입니다.'});
        }
        const work = await Work.findById(workId);
        if(!work) {
            return res.status(404).json({msg: '존재하지 않는 작품입니다.'});
        }

        await work.removeLiker(user);
        work.likes = await work.countLiker();
        await work.save();
        res.json({likes: work.likes});
    } catch(error) {
        res.status(500).json(error);
    }
};