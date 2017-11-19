const con = require('./db.js');

exports.createTable = () => {
    let q1 = new Promise((resolve, reject) => {
        con.query('DROP TABLE IF EXISTS user', (err, results) => {
            if(err) reject(err);
            else resolve(results);
        });
    });

    let q2 = new Promise((resolve, reject) => {
        con.query('CREATE TABLE user (\
            `userno` int(11) NOT NULL AUTO_INCREMENT,\
            `email` varchar(255) NOT NULL,\
            `password` varchar(255) NOT NULL,\
            `displayName` varchar(255) NOT NULL,\
            `userName` varchar(255) NOT NULL,\
            `photo` text NOT NULL DEFAULT "",\
            `profile` text NOT NULL DEFAULT "",\
            `isAdmin` tinyint(1) NOT NULL DEFAULT 0,\
            `isBanned` tinyint(1) NOT NULL DEFAULT 0,\
            `banDate` date default "0000-00-00",\
            `createdAt` datetime NOT NULL,\
            PRIMARY KEY (`userno`),\
            UNIQUE KEY `email` (`email`),\
            UNIQUE KEY `userName` (`userName`))', (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
    });

    return Promise.all([q1, q2]);
};

exports.findExistancy = ({email, userName}) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM user WHERE email = ? OR displayName = ?', [email, userName], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};

exports.register = ({email, password, displayName, userName}) => {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO user(email, password, displayName, userName, createdAt) VALUES (?, ?, ?, ?, ?)',
        [email, password, displayName, userName, new Date()], (err, results) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};