const mysql = require('mysql');

const {
    DB_HOST: host,
    DB_USER: user,
    DB_PASSWORD: password,
    DB_NAME: database,
} = process.env;

const dbconfig = {
    host,
    user,
    password,
    database
};

const connection = mysql.createConnection(dbconfig);

module.exports = connection;