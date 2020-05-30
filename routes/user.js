const express = require('express');
const _ = require('underscore');

const { validator, login_validator } = require('../models/user');
const user_service = require('../services/user_service');
const auth = require('../middleware/auth');

const router = express.Router();

// define the routes here...
router.post('/register', async (req, res) => {
    const error = validateAttr(req.body, true);
    if (error) return res.status(422).send(_.pluck(error.details, 'message'));

    const { isRegister, user } = await user_service.register(req.body);
    if (isRegister == false) return res.status(403).send("User already exists.");

    res.json(user);
});

router.post('/login', async (req, res) => {
    const error = validateAttr(req.body);
    if (error) return res.status(422).send(_.pluck(error.details, 'message'));

    const user = await user_service.login(req.body);
    if (user == null) return res.status(403).send("Your email or password is incorrect");

    const token = await user.generateToken();

    // setting the token
    user.token = token;
    res.json(_.pick(user, '_id', 'name', 'email', 'token', 'role', 'movieInfo', 'favourites'));
});

router.patch('/toggle-favourites', auth, async (req, res) => {
    const query_param = req.query.is_remove;
    const is_remove = query_param == null ? false : true;

    const movie_id = req.body.movie_id;
    const user = await user_service.toggleFavourites(
        req.user._id,
        movie_id, 
        is_remove
    );

    res.json(user);
});

const validateAttr = function (user, isRegister = false) {
    if (isRegister)
        var { error } = validator.validate(user, { abortEarly: false });
    else
        var { error } = login_validator.validate(user, { abortEarly: false });

    return error;
}

module.exports = router;