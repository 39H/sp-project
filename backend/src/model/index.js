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

Object.keys(db).forEach(model => {
    db[model].sync();
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;