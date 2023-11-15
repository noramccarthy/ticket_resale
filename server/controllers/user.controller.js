const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    findAllUsers: (req, res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(400).json(err))
    },
    register: async (req, res) => {
        // check if email is already being used
        const user = await User.findOne({email: req.body.email})
        if(user !== null){
            return res.status(400).json({message: "Email already taken."})
        }

        User.create(req.body)
            .then(newUser => {
                const userToken = jwt.sign({
                    id: newUser._id
                }, process.env.REACT_APP_SECRET_KEY);
                res
                    .cookie("usertoken", userToken, {httpOnly:true})
                    .json({message: "Successful registration", user: newUser})
            })
            .catch(err => res.status(400).json({message: "Problem with registration", error: err}))
    },
    login: async (req, res) => {
        // If user does not match, give error
        const user = await User.findOne({email: req.body.email})
        if (user === null) {
            return res.status(400).json({message: "Invalid login"})
        }
        // User found in DB
        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        // If PW does not match DB, give error
        if (!correctPassword) {
            return res.status(400).json({message: "Invalid login"})
        }
        // create token
        const userToken = jwt.sign({
            id: user._id,
        }, process.env.REACT_APP_SECRET_KEY);

        console.log(userToken);

        // create cookie
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", userInfo: {
                id: user._id,
                username: user.username
            } });
    },
    logout: (req, res) => {
        // close cookie session
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}