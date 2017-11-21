const Joi = require('joi');
const Model = require('model');
const Thread = Model.Thread;
const User = Model.User;



// 사용자별 게시글 가져오기

// 글id, 제목, 작성자 displayName, 작성자 userName, 글 작성일, 글 수정일
// todo: Pagenate


exports.getThreads = (req, res) => {
    const hostUserName = req.params.user_name;
    // const page / limit?
    User.findByUserName(hostUserName).then(user => {
        user.getHostedThreads().then(results => {
            const threads = results.map(thread => {
                const { id, subject, content, createdAt, updatedAt } = thread;

            });

            const promises = [];
            results.forEach(thread => {
                const { id, subject, content, createdAt, updatedAt } = thread;
                promises.push(new Promise((resolve, reject) => {
                    thread.getUser().then(writer => {
                        const { displayName, userName } = writer;
                        resolve({ id, subject, content, createdAt, updatedAt, displayName, userName });
                    }).catch(error => {
                        reject(error);
                    });
                }));
            });

            Promise.all(promises).then(results => {
                res.json(results);
            });
        });
    }).catch(error => {
        res.status(500).json(error);
    });
};

exports.writeThread = (req, res) => {
    if(!req.user) return res.status(403).json({msg: '먼저 로그인 하세요.'});
    const { subject, content } = req.body;

    // todo: Joi 로 subject, content 유효성 검사

    const hostUserName = req.params.user_name;

    const findHost = User.findByUserName(hostUserName);
    const findWriter = User.findById(req.user.id);

    Promise.all([findHost, findWriter]).then(results => {
        const host = results[0];
        const writer = results[1];

        Thread.write({host, writer, subject, content}).then(result => {
            res.json(result);
        });
    }).catch(error => {
        res.status(500).json(error);
    });

    User.findById(req.user.id).then();
};