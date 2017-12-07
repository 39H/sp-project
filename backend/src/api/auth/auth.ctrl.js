const Joi = require('joi');
const User = (require('model')).User;
const transporter = require('lib/mailer');

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

/*exports.forgetpass = (req, res) => {
    todo : 새로 비밀번호를 생성해서, 유저 테이블을 바꾸고 이메일로 전달

    })
}*/

exports.edit = (req, res) => {
    if(!req.user) return res.status(403).json({msg: "로그인 중이 아닙니다."}); 

    const { userName, new_password } = req.body; // 변경 정보
    User.findByUserName(userName).then(user => {
            if (req.user.id != user.id) return res.status(403).json({msg : "토큰 발행 당시 id와 현재 요청 id 일치 하지 않음"}); 
            if (!user) return res.status(403).json({msg: "해당 userName의 유저가 존재하지 않습니다."});

            user.password_edit(new_password).then(updated => {
                console.log("edit username");
                const { id, password, userName } = updated;
                const result = { id, password, userName };
                res.json({msg: "PUT OK", result});
            });
        }).catch(error => {
            return res.status(403).json({msg: "Promise 오류"});
        });
};

exports.delete = (req, res) => {
    if(!req.user) return res.status(403).json({msg: "로그인 중이 아닙니다."});

    const {userName} = req.body;

    User.findByUserName(userName).then(user => {
            if (req.user.id != user.id) return res.status(403).json({msg : "토큰 발행 당시 id와 현재 요청 id 일치 하지 않음"}); 
            if (!user) return res.status(403).json({msg: "해당 userName의 유저가 존재하지 않습니다."});

            user.delete().then(user => {
                res.json({msg: "delete OK" });
            });
        }).catch(error => {
            return res.status(403).json({msg: "Promise 오류"});
        });
};


exports.forgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findByEmail(email);
        if(!user) {
            return res.json();
        }

        const code = new Date().valueOf();
        user.update({findPasswordCode: code});

        let data = {
            from: 'admin@the.gg',
            to: email,
            subject: 'Reset Password Url',
            text: '/password/'+code
        };

        transporter.sendMail(data);
        res.json();
    } catch(error) {
        res.status(500).json({error});
    }
};

exports.changeForgotPassword = async (req, res) => {
    const {email, code, newPassword} = req.body;

    try {
        const user = await User.findByEmail(email);
        if(!user) {
            return res.status(403).json();
        }

        if(!user.findPasswordCode || user.findPasswordCode === '' || user.findPasswordCode !== code) {
            return res.status(403).json();
        }

        await user.update({findPasswordCode: null});
        await user.password_edit(newPassword);
        res.json();
    } catch(error) {
        res.status(500).json({error});
    }
};