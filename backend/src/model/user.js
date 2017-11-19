const crypto = require('crypto');

const { PASSWORD_HASH_KEY: secret } = process.env;

function hash(password) {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        displayName: DataTypes.STRING,
        userName: DataTypes.STRING,
        photo: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        profile: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        banDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    });

    User.associate = function (model) {
    };

    User.findByEmail = function (email) {
        return User.findOne({where: {email}});
    };

    User.findByUserName = function (userName) {
        return User.findOne({where: {userName}});
    };

    User.findExistancy = function ({email, userName}) {
        return User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {userName}
                ]
            }
        });
    };

    User.register = function ({email, password, displayName, userName}) {
        return User.create({
            email, password: hash(password), displayName, userName
        });
    };

    User.prototype.validatePassword = function(password) {
        const hashed = hash(password);
        return this.password === hashed;
    };

    return User;
};

