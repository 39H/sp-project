const User = (require('model')).User;

exports.test = (req, res) => {
    res.send('Hello Test!');
};



exports.register = (req, res) => {
    let body = req.body;
    const {email, password, displayName, userName} = body;
    
    // todo: email, password, displayName, userName 유효성 검사
    User.findExistancy({email, userName}).then(exists => {
        if(exists) {
            const key = exists.email === email ? 'email' : 'userName';
            return res.status(409).json({key});
        }

        User.register({email, password, displayName, userName}).then(user => {
            res.json({id: user.id, email, displayName, userName});
        });
    });
};

exports.login = (req, res) => {
    let body = req.body;

    const {email, password} = body;
    // todo: email, password 유효성 검사
    User.findByEmail(email).then(user => {
        if(!user) return res.status(403).json();
        const validatePassword = user.validatePassword(password);

        if(!validatePassword) {
            // 비밀번호 불일치
            return res.status(403).json();
        }

        // todo: 로그인 토큰 발급
    });
};