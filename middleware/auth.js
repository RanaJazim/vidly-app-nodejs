const jwt = require('jsonwebtoken');
const { private_key } = require('../config/private_key');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied. Token not provided');
    try {
        const decoded = jwt.verify(token, private_key);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).send('Invalid token');
    }
}