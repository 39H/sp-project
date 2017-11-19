
module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const Attachment = sequelize.define('Attachment', {
        fileName: DataTypes.STRING,
        filePath: DataTypes.TEXT
    });

    Attachment.associate = function(model) {
        Attachment.belongsTo(model.Work);
    };

    return Attachment;
};