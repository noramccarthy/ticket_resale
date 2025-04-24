const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."],
        minlength: [1, "Name must be at least 1 character."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."],
        minlength: [1, "Name must be at least 1 character."]
    },
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
    phone: {
        type: String,
        required: false,
        validate: {
            validator: val => /^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/.test(val),
            message: "Please enter a valid phone number."
        }
    },
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
        next();
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