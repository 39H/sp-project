const user = require('model/user.js');

exports.test = (req, res) => {
    res.send('Hello Test!');
};

exports.register = (req, res) => {
    let body = req.body;
    const { email, password, displayName, userName } = body;

    //email 검사
    //password 검사
    //displayName 검사
    //userName 검사

    user.findExistancy({email, userName}).then(
        (results) => {
            if(results.length > 0) {
                const key = results[0].email === email ? 'email' : 'userName';
                throw {code:409, body:{key}};
            }
            return user.register({email, password, displayName, userName});
        }
    ).catch((error) => {
        console.log('Failed to register');
        let code = 400;
        if(error.code) {
            let body = Object.assign({}, error.body);
            code = error.code;
            error = body;
        };
        res.status(code).json(error);
    }).then((result) => {
        console.log('OK');
        res.json({
            _id: result.insertId,
            email,
            displayName,
            userName
        });
    });
};