const Joi = require('joi');
const User = (require('model')).User;

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

// 시용자 정보 수정 (비밀번호 변경, (디스플레이이름변경?), 프로필사진변경, 프로필내용변경)
exports.edit = (req, res) => {

};

// 프로필사진같은거 업로드 api 따로 구현해야되나? (이건 json 형식이 아니라 form-data 형식일듯..)