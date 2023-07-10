const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email."
        }
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be at least 8 characters."]
    },
    listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }]
}, {timestamps: true});

// Confirm PW
// we don't want to save confirmPassword in DB -> virtual environment
UserSchema.virtual("confirmPassword")
// establish a getter/setter for the virtual field
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

// Validate confirm PW
// use some Middleware to add another validation
// avoid rewriting the callback function using an arrow function as it wont have the correct scope for 'this'
UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match.");
    } else {
        next()
    }
});

// Hash and salt PW
UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash =>{
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;