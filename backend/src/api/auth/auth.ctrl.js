const Joi = require('joi');
const User = (require('model')).User;

exports.register = (req, res) => {
    let body = req.body;

    // todo: displayName, userName 검사 조건 손보기
    // todo: 로그인 토큰 발급 ?

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30),
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
        userName: Joi.string().regex(/^[a-zA-Z0-9]{3,12}$/).required()
    });

    const result = Joi.validate(body, schema);

    if(result.error) {
        return res.status(400).json(result.error);
    }

    const {email, password, displayName, userName} = body;


    User.findExistancy({email, userName}).then(exists => {
        if(exists) {
            const key = exists.email === email ? 'email' : 'userName';
            return res.status(409).json({key});
        }

        User.register({email, password, displayName, userName}).then(user => {
            res.json({id: user.id, email, displayName, userName});
        }).catch(error => {
            res.status(500).json(error);
        });
    });
};

exports.login = (req, res) => {
    let body = req.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    });

    const result = Joi.validate(body, schema);

    if(result.error) {
        return res.status(400).json(result.error);
    }

    const {email, password} = body;

    User.findByEmail(email).then(user => {
        if(!user) return res.status(403).json();
        const validatePassword = user.validatePassword(password);

        if(!validatePassword) {
            // 비밀번호 불일치
            return res.status(403).json();
        }

        user.generateToken().then(
            accessToken => {
                console.log('success');
                res.cookie('access_token', accessToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });
                

                const { id, displayName, userName } = user;

                res.json({id, displayName, userName});
            }
        );
    }).catch(error => {
        res.status(500).json(error);
    });
};

exports.check = (req, res) => {
    const { user } = req;

    if(!user) {
        return res.status(403).json();
    }
    res.json({user});
};

exports.logout = (req, res) => {
    res.cookie('access_token', null, {
        httpOnly: true,
        maxAge: 0
    });
    res.status(204).json();
};

// todo: 비밀번호 찾기?