const Model = require('model');
const User = Model.User;

// 내가 구독한 사람
exports.getCreator = (req, res) => {
    if(!req.user) return res.status(403).json();
    
        User.findById(req.user.id).then(user => {
            user.getCreator().then(results => {
                const creators = results.map((creator) => { const {userName, displayName} = creator; return {userName, displayName}; });
                res.json(creators);
            });
        }).catch(error => {
            res.status(500).json(error);
        });
};


// 나를 구독한 사람
exports.getSubscriber = (req, res) => {
    if(!req.user) return res.status(403).json();

    User.findById(req.user.id).then(user => {
        user.getSubscriber().then(results => {
            console.log(results.length); // 0이면 구독자 없음
            const subscribers = results.map((subscriber) => { const {userName, displayName} = subscriber; return {userName, displayName}; });
            res.json(subscribers);
        });
    }).catch(error => {
        res.status(500).json(error);
    });
};

// todo: 이미 구독한 사용자인지 체크하고 구독or 오류메세지 날리게? 굳이??
// todo: 본인 자신은 구독할 수 없게;;
// todo: unsubscribe도 마찬가지로;; 체크할까 말까;;

// 구독하기
exports.subscribe = (req, res) => {
    if(!req.user) return res.status(403).json();

    const userName = req.params.user_name;

    const findUser = User.findById(req.user.id);
    const findCreator = User.findByUserName(userName);

    Promise.all([findUser, findCreator]).then(results => {
        const user = results[0];
        const creator = results[1];

        if(user.id === creator.id) return res.status(400).json({msg: '자기 자신을 구독할 수 없습니다.'});

        user.addCreator(creator).then(subscribed => {
            //if(Object.keys(subscribed).length === 0) console.log('이미 구독한 상대입니다.');
            res.json();
        });
    }).catch(error => {
        res.status(500).json(error);
    });

};

// 구독 취소
exports.unsubscribe = (req, res) => {
    if(!req.user) return res.status(403).json();

    const userName = req.params.user_name;

    const findUser = User.findById(req.user.id);
    const findCreator = User.findByUserName(userName);

    Promise.all([findUser, findCreator]).then(results => {
        const user = results[0];
        const creator = results[1];

        user.removeCreator(creator).then(unsubscribed => {
            res.json(unsubscribed);
        });
    }).catch(error => {
        res.status(500).json(error);
    });
};