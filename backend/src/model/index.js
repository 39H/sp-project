const Sequelize = require('sequelize');

const {
    DB_HOST: host,
    DB_USER: user,
    DB_PASSWORD: password,
    DB_NAME: database,
} = process.env;

const db = {};

const sequelize = new Sequelize(
    database,
    user,
    password,
    {
        host,
        dialect: 'mysql',
        operatorsAliases: false
    }
);

db['User'] = require('./user')(sequelize, Sequelize);
db['Work'] = require('./work')(sequelize, Sequelize);
db['Thread'] = require('./thread')(sequelize, Sequelize);
db['Comment'] = require('./comment')(sequelize, Sequelize);
db['Attachment'] = require('./attachment')(sequelize, Sequelize);

Object.keys(db).forEach(model => {
    if(db[model].associate) db[model].associate(db);
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;