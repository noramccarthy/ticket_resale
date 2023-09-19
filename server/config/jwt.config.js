const jwt = require('jsonwebtoken');

// middleware that allows users to be logged in to CRUD 
// we can use this middleware anywhere to make sure a user is logged in when performing any type of CRUD

// retrieve the values from .env
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