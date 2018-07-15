const User = require('../models/user.model');


var authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    console.log(token);
    User.findByToken(token)
        .then((user) => {
            if(!user){
                console.log('no');
                return Promise.reject();
            }
            console.log('ok');

            req.user = user;
            req.token = token;
            next();
        })
        .catch((error) => {
            res.status(401).json({
                error: error
            });
        });
}

module.exports = authenticate;