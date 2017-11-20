const { generateToken, decodeToken } = require('../token');

module.exports = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        req.user = null;
        return next();
    }

    decodeToken(token).then(decoded => {
        const { user } = decoded;
        // 발급하고 3일이 지나면 토큰 다시 발급
        if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24 * 3) {
            generateToken({ user }, 'user').then(freshToken => {
                res.cookie('access_token', freshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });
            });
        }

        req.user = user;
        next();
    }).catch(error => {
        req.user = null;
        next();
    });
};