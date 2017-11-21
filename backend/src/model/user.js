const crypto = require('crypto');
const token = require('lib/token');

const { PASSWORD_HASH_KEY: secret } = process.env;

function hash(password) {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail:true
            }
        },
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

    User.associate = function(model) {
        User.belongsToMany(User, {as: 'Creator', through: 'Subscribe', foreignKey: 'CreatorId', otherKey: 'UserId'});
        User.belongsToMany(User, {as: 'Subscriber', through: 'Subscribe', foreignKey: 'UserId', otherKey: 'CreatorId'});
        User.belongsToMany(model.Work, {as: 'LikedWorks', through: 'Like'});
        User.hasMany(model.Work, {as: 'Works'});
        User.hasMany(model.Thread, {as: 'HostedThreads', foreignKey: 'HostId'});
        User.hasMany(model.Thread, {as: 'Threads'});
        User.hasMany(model.Comment, {as: 'Comments'});
    };

    User.findByEmail = function(email) {
        return User.findOne({where: {email}});
    };

    User.findByUserName = function(userName) {
        return User.findOne({where: {userName}});
    };

    User.findExistancy = function({email, userName}) {
        return User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {userName}
                ]
            }
        });
    };

    User.register = function({email, password, displayName, userName}) {
        return User.create({
            email, password: hash(password), displayName, userName
        });
    };

    User.prototype.validatePassword = function(password) {
        const hashed = hash(password);
        return this.password === hashed;
    };

    User.prototype.generateToken = function() {
        const { id, userName, displayName } = this;
        return token.generateToken({
            user: {
                id,
                displayName,
                userName
            }
        }, 'user');
    };

    return User;
};

