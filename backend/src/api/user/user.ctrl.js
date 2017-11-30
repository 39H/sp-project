const Joi = require('joi');
const Model = require('model');
const { User } = Model;

// 자신 정보 조회
exports.getMyInfo = async (req, res) => {
    if(!req.user) return res.status(403).json({msg: '먼저 로그인 하세요.'});

    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({msg: '유효하지 않은 사용자입니다.'});

    const { displayName, photo, profile } = user;
    res.json({ displayName, photo, profile });
};

// 사용자 정보 조회 ((이메일?), 유저이름, 디스플레이이름, 프로필사진, 프로필내용))
exports.view = (req, res) => {
    const userName = req.params.user_name;

    User.findByUserName(userName).then(user => {

        // 해당 userName 없음
        if(!user) return res.status(404).json();
        
        const { userName, displayName, photo, profile } = user;
        const result = { userName, displayName, photo, profile };
        res.json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
};

// 시용자 정보 수정 (닉네임 변경, 프로필사진변경, 프로필내용변경)
exports.edit = (req, res) => {
    if(!req.user) return res.status(403).json({msg: "로그인 중이 아닙니다."}); // 로그인 케이스 판별

    const userName = req.params.user_name;
    const { displayName, photo, profile } = req.body; // 변경 정보

    User.findByUserName(userName).then(user => {
            if (req.user.id != user.id) return res.status(403).json({msg : "토큰 발행 당시 id와 현재 요청 id 일치 하지 않음"}); 
            if (!user) return res.status(403).json({msg: "해당 userName의 유저가 존재하지 않습니다."});

            user.edit({displayName, photo, profile}).then(updated => {
                const { id, displayName, photo, profile } = updated;
                const result = { id, displayName, photo, profile };
                res.json({msg: "Update OK", result});
            });
        }).catch(error => {
            return res.status(403).json({msg: "Promise 에러"});
        });
};

// 프로필사진같은거 업로드 api 따로 구현해야되나? (이건 json 형식이 아니라 form-data 형식일듯..)
