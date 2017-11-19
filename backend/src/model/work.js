
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

    return Work;
};