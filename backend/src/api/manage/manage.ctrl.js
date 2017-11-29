const Model = require('model');
const { User, Thread, Comment, Work } = Model;
const multer = require('multer');
const path = require('path');
const fs = require('fs');


exports.getAllThreads = async (req, res) => {
    try {
        const threads = await Thread.findAll({order: [['createdAt','DESC']]});

        const results = [];
        await Promise.all(threads.map(async thread => {
            const { id, subject, createdAt, updatedAt } = thread;
            const writer = await thread.getUser();
            const { displayName, userName } = writer;
            const host = await thread.getHost();

            results.push({ id, subject, createdAt, updatedAt, displayName, userName, hostDisplayName: host.displayName, hostUserName: host.userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    }
};

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

exports.getMyThreads = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(403).json({msg: '유효하지 않은 사용자입니다.'});
        }

        const threads = await user.getThreads({order: [['createdAt','DESC']]});

        const results = [];
        await Promise.all(threads.map(async thread => {
            const { id, subject, createdAt, updatedAt } = thread;
            const { displayName, userName } = user;
            const host = await thread.getHost();

            results.push({ id, subject, createdAt, updatedAt, displayName, userName, hostDisplayName: host.displayName, hostUserName: host.userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.getMyComments = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({msg: '먼저 로그인 하세요.'});
    }

    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(403).json({msg: '유효하지 않은 사용자입니다.'});
        }

        const comments = await user.getComments({order: [['createdAt','DESC']]});

        const results = [];
        await Promise.all(comments.map(async comment => {
            const { id, content, createdAt, updatedAt, ThreadId } = comment;
            const { displayName, userName } = user;

            results.push({ id, content, createdAt, updatedAt, ThreadId, displayName, userName });
        }));

        res.json(results);
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.profileupload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/profiles/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf()  + path.extname(file.originalname));
      }
    }),
  });

  exports.thumbnailupload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/thumbnails/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf()  + path.extname(file.originalname));
      }
    }),
  });

  exports.profile = (req, res) => {
    const file = req.file;
    const userid = req.params.user_id;
    console.log(file);
    //if(req.user.id != userid) return res.status(400).json({msg : "권한이 없습니다"});

    User.findById(userid).then(user =>{
        user.edit({photo : file.path}).then(photouser => {
            return res.status(200).json({msg: "profile upload OK", user_email : photouser.email, photo : file.path})
            .catch(error => {return res.status(403).json(); })
        })
    })
    .catch(error => {
        return res.status(403).json();
    });
    return res.status(400).json();
}

exports.thumbnail = (req, res) => {
    const file = req.file;
    const workid = req.params.work_id;

    //if(req.user.id != userid) return res.status(400).json({msg : "권한이 없습니다"});

    Work.findById(workid).then(work =>{
        work.edit({thumbnail : file.path}).then(photowork => {
            console.log(photowork.thumbnail);
            return res.status(200).json({msg: "thumbnail upload OK", work_id : photowork.id, thumbnail : file.path})
            .catch(error => {return res.status(403).json(); })
        })
    })
    .catch(error => {
        return res.status(403).json();
    });
    return res.status(400).json();
}
