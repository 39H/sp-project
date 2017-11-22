
module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const Comment = sequelize.define('Comment', {
        content: DataTypes.TEXT
    });

    Comment.associate = function(model) {
        Comment.belongsTo(model.Thread);
        Comment.belongsTo(model.User);
    };

    Comment.write = function({user, thread, content}) {
        return Comment.create({
            content,
            UserId: user.id,
            ThreadId: thread.id
        });
    };

    return Comment;
};