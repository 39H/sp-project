const Joi = require('joi');
const Model = require('model');
const { User, Thread } = Model;

// 게시글 목록 가져오기
// todo: 작성일 DESC 으로 orderBy..?, pagenate?
exports.getThreads = async (req, res) => {
    const hostUserName = req.params.user_name;

    try {
        const host = await User.findByUserName(hostUserName);
        if(!host) {
            return res.status(404).json({msg: '해당 사용자의 커뮤니티를 찾을 수 없습니다.'});
        }

        const threads = await host.getHostedThreads();

        const results = [];
        await Promise.all(threads.map(async thread => {
            const { id, subject, createdAt, updatedAt } = thread;
            const writer = await thread.getUser();
            const { displayName, userName } = writer;

            results.push({ id, subject, createdAt, updatedAt, displayName, userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    };
};


// 게시글 작성
// todo: 유효성 검사
exports.writeThread = async(req, res) => {
    const hostUserName = req.params.user_name;

    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    const { subject, content } = req.body;

    try {
        const host = await User.findByUserName(hostUserName);
        if(!host) {
            return res.status(404).json({msg: '해당 사용자의 커뮤니티를 찾을 수 없습니다.'});
        }

        const writer = await User.findById(req.user.id);

        const writed = await Thread.write({host, writer, subject, content});
        res.json(writed);
    } catch(error) {
        res.status(500).json(error);
    }
};


// 게시글 조회
exports.getThread = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;

    try {
        const thread = await Thread.findById(threadId);
        if(!thread) {
            return res.status(404).json({msg: '존재하지 않는 게시글입니다.'});
        }
    
        const { id, subject, content, createdAt, updatedAt, UserId } = thread;
    
        const writer = await User.findById(UserId);
        const { displayName, userName } = writer;

        res.json({ id, subject, content, createdAt, updatedAt, displayName, userName });
    } catch(error) {
        res.status(500).json(error);
    }
};

// 게시글 수정
// todo: 유효성 검사

exports.patchThread = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;

    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    const { subject, content } = req.body;

    try {
        const thread = await Thread.findById(threadId);
        if(!thread) {
            return res.status(404).json({msg: '존재하지 않는 게시글입니다.'});
        }

        if(thread.UserId !== req.user.id) {
            return res.status(403).json({msg: '게시글 작성자가 아닙니다.'});
        }

        const patched = await thread.update({subject, content});
        res.json(patched);

    } catch(error) {
        res.status(500).json(error);
    }
};

// 게시글 삭제
exports.deleteThread = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;

    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    try {
        const thread = await Thread.findById(threadId);
        if(!thread) {
            return res.status(404).json({msg: '존재하지 않는 게시글입니다.'});
        }

        if(thread.UserId !== req.user.id) {
            return res.status(403).json({msg: '게시글 작성자가 아닙니다.'});
        }

        const deleted = await thread.destroy();
        
        res.json(deleted);
    } catch(error) {
        res.status(500).json(error);
    }
};