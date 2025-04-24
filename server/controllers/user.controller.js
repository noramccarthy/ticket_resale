const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const extractUserIdFromToken = (req) => {
    const token = req.cookies.usertoken;
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
        return decoded.id
    } catch (err) {
        return null;;
    }
};

module.exports = {
    getLoggedInUser: (req, res) => {
        const userId = extractUserIdFromToken(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized action"});
        }
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            res.json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.number
            });
        })
        .catch(err => res.status(500).json({ message: "Error retrieving user info", error: err}));
    },

    findAllUsers: (req, res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(400).json(err))
    },

    register: async (req, res) => {
        // check if email is already being used
        const user = await User.findOne({email: req.body.email})
        if(user !== null){
            return res.status(400).json({message: "Email address already taken"})
        }

        User.create(req.body)
            .then(newUser => {
                const userToken = jwt.sign({
                    id: newUser._id
                }, process.env.REACT_APP_SECRET_KEY);
                res
                    .cookie("usertoken", userToken, {httpOnly:true})
                    .json({
                        message: "Successful registration", 
                        user: {
                            id: newUser._id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            phone: newUser.number,
                        }
                    })
            })
            .catch(err => res.status(400).json({message: "Problem with registration", error: err}))
    },
    login: async (req, res) => {
        // If user does not match, give error
        const user = await User.findOne({email: req.body.email})
        if (user === null) {
            return res.status(400).json({message: "Email address not found"})
        }
        // User found in DB
        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        // If PW does not match DB, give error
        if (!correctPassword) {
            return res.status(400).json({message: "Try another password"})
        }
        // create token
        const userToken = jwt.sign({ id: user._id }, process.env.REACT_APP_SECRET_KEY);

        // create cookie
        res
            .cookie("usertoken", userToken, { httpOnly: true })
            .json({ 
                msg: "success!", 
                userInfo: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.number,
                } 
            });
    },
    logout: (req, res) => {
        // close cookie session
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },
    updateUser: async (req, res) => {
        const userId = extractUserIdFromToken(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized action" });
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    number: req.body.phone,
                },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                message: "User updated successfully",
                user: {
                    id: updatedUser._id,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    phone: updatedUser.number,
                }
            });
        } catch (err) {
            res.status(500).json({ message: "Error updating user", error: err });
        }
    }
}