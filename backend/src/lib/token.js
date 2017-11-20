const jwt = require('jsonwebtoken');
const { JWT_SECRET: secret } = process.env;

exports.generateToken = (payload, subject) => {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(payload, secret, {
                issuer: 'sp_project',
                expiresIn: '7d',
                subject
            }, (err, token) => {
                if(err) reject(err);
                resolve(token);
            });
        }
    );
};

exports.decodeToken = (token) => {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) reject(err);
                resolve(decoded);
            });
        }
    );
};