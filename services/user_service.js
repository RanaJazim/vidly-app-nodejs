const _ = require('underscore');
const bcrypt = require('bcryptjs');

const { User } = require('../models/user');

async function register(user) {
    const existing_user = await User.findOne({ email: user.email });

    if (existing_user != null) return { isRegister: false, user };

    user = new User(_.pick(user, 'name', 'email', 'password'));
    user = await user.save();

    return { isRegister: true, user };
}

async function login(user) {
    const checking_user = await User.findOne({ 
        email: user.email, 
    });

    if (checking_user == null) return null;
    const match = await bcrypt.compare(user.password, checking_user.password);

    return match ? checking_user : null;
}

module.exports = {
    register,
    login,
};