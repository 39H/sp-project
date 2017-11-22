
module.exports = (sequelize, DataTypes) => {
    const Op = DataTypes.Op;

    const Attachment = sequelize.define('Attachment', {
        fileName: DataTypes.STRING,
        filePath: DataTypes.TEXT
    });

    Attachment.associate = function(model) {
        Attachment.belongsTo(model.Work);
    };

    
    Attachment.upload = function(fileName, filePath, work){
        return Attachment.create({
            fileName: fileName,
            filePath: filePath,
            WorkId: work.id
        })
    }

    Attachment.findall = function(workId){
        return Attachment.findAll({where : {workId : workId}});
    }
    
    return Attachment;
   
};
