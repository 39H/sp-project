
module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const Thread = sequelize.define('Thread', {
        subject: DataTypes.STRING,
        content: DataTypes.TEXT
    });

    Thread.associate = function(model) {
        Thread.hasMany(model.Comment, {as: 'Comments'});
        Thread.belongsTo(model.User, {as: 'Host', foreignKey: 'HostId'});
        Thread.belongsTo(model.User);
    };

    return Thread;
};