
module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const Work = sequelize.define('Work', {
        subject: DataTypes.STRING,
        workType: DataTypes.ENUM('image', 'video', 'text'),
        workURL: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        content: DataTypes.TEXT,
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    Work.associate = function(model) {
        Work.belongsToMany(model.User, {as:'Liker', through: 'Like' });
        Work.hasMany(model.Attachment, {as: 'Attachments'});
        Work.belongsTo(model.User);
    };

    Work.getList = function({userName=null, orderBy='recent', page=1, cutby=10}) {
        if(page < 1) page = 1;
        if(cutby < 1) cutby = 1;
        // todo: cutby 최대값 설정?

        let order;
        switch(orderBy) {
            case 'likes':
            order = [['likes', 'DESC']];
            break;
            case 'recent':
            case 'default':
            order = [['createdAt', 'DESC']];
        }

        let where = null;
        if(userName) where = {userName};

        let offset = (page-1) * cutby;
        return Work.findAll({
            limit: cutby,
            offset,
            order: [['createdAt', 'DESC']],
            where
        });
    };

    // todo: 메인화면에서 구독한 사람들 작품 목록 가지고 오는 함수... (어케 가져올지..)
       Work.upload = function({subject,  workType, workURL, thumbnail, content, User}) {
        return Work.create({
            subject, workType, workURL, thumbnail, content, UserId : User.id
        })
    }

    Work.uploadWork = function({subject, workType, workURL, thumbnail, content, UserId}) {
        return Work.create({
            subject, workType, workURL, thumbnail, content, UserId
        });
    };

    return Work;
};
