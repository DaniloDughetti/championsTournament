const User = require('../models/user.model');


var authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    try {
        User.findByToken(token)
            .then((user) => {
                if (!user) {
                    return Promise.reject();
                }

                req.user = user;
                req.token = token;
                next();
            })
            .catch((error) => {
                res.status(401).json({
                    error: error
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

module.exports = authenticate;