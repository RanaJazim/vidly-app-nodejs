const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const joi = require('@hapi/joi');
const _ = require('underscore');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// hashing the password
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// generating token
userSchema.method('generateToken', async function() {
    const payload = { _id: this._id, name: this.name, email: this.email };
    const private_key = "secretKey";
    const token = await jwt.sign(payload, private_key);

    return token;
});


const User = mongoose.model("User", userSchema);

const validator = joi.object({
    name: joi.string().min(5).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
});

const login_validator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
});

module.exports = {
    User,
    validator,
    login_validator,
};