const jwt = require('jsonwebtoken');

const secret = process.env.REACT_APP_SECRET_KEY;

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({message: "Unauthorized user"})
        } else {
            console.log("Payload:", payload)
            req.jwtpayload = payload
            next();
        }
    });
}