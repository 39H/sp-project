
module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const Comment = sequelize.define('Comment', {
        content: DataTypes.TEXT
    });

    Comment.associate = function(model) {
        Comment.belongsTo(model.Thread);
        Comment.belongsTo(model.User);
    };

    return Comment;
};