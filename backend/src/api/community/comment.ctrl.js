const Joi = require('joi');
const Model = require('model');
const { User, Thread, Comment } = Model;

// 게시글 전체 목록
// todo: 사용자가 관리자인지 체크? 굳이?, pagenate?
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({order: [['createdAt','DESC']]});

        const results = [];
        await Promise.all(comments.map(async comment => {
            const { id, content, createdAt, updatedAt, ThreadId } = comment;
            const user = await comment.getUser();
            const { displayName, userName } = user;

            results.push({ id, content, createdAt, updatedAt, ThreadId, displayName, userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    }
};

// 댓글 목록 가져오기
// todo: pagenate?
exports.getComments = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;

    console.log(req.params);

    try {
        const thread = await Thread.findById(threadId);

        if(!thread) {
            return res.status(404).json({msg: '게시글을 찾지 못했습니다.'});
        }

        const comments = await thread.getComments({order: [['createdAt','DESC']]});

        const results = [];
        await Promise.all(comments.map(async comment => {
            const { id, content, createdAt, updatedAt, ThreadId } = comment;
            const user = await comment.getUser();
            const { displayName, userName } = user;

            results.push({ id, content, createdAt, updatedAt, ThreadId, displayName, userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json();
    }
};


// 댓글 작성
// todo: 유효성 검사
exports.writeComment = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;

    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    const { content } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const thread = await Thread.findById(threadId);
        const writed = await Comment.write({user, thread, content});

        return res.json(writed);
    } catch(error) {
        res.status(500).json(error);
    }

};

// 댓글 조회
exports.getComment = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;
    const commentId = req.params.comment_id;

    try {
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return res.status(404).json({msg: '존재하지 않는 댓글입니다.'});
        }

        const { id, content, createdAt, updatedAt, ThreadId } = comment;
        res.json({id, content, createdAt, updatedAt, ThreadId});
    } catch(error) {
        res.status(500).json(error);
    }
};

// 댓글 수정
// todo: 유효성 검사
exports.patchComment = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;
    const commentId = req.params.comment_id;

    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    const { content } = req.body;

    try {
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return res.status(404).json({msg: '존재하지 않는 댓글입니다.'});
        }

        if(comment.UserId !== req.user.id) {
            return res.status(403).json({msg: '댓글 작성자가 아닙니다.'});
        }

        const patched = await comment.update({content});
        res.json(patched);

    } catch(error) {
        res.status(500).json(error);
    }
};


// 댓글 삭제
exports.deleteComment = async (req, res) => {
    const hostUserName = req.params.user_name;
    const threadId = req.params.thread_id;
    const commentId = req.params.comment_id;

    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    try {
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return res.status(404).json({msg: '존재하지 않는 댓글입니다.'});
        }

        if(comment.UserId !== req.user.id) {
            return res.status(403).json({msg: '댓글 작성자가 아닙니다.'});
        }

        const deleted = await comment.destroy();

        res.json(deleted);
    } catch(error) {
        res.status(500).json(error);
    }
};