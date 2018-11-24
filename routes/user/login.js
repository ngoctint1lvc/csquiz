const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');
const secretkey = require('../../config/tokensecretkey').tokenSecretKey;

// @route   POST user/login
// @desc    Login and return access_token
// @access  Public
router.post('/', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }

    if (!user.username || !user.password){
        return res.status(400).json({
            message: 'Missing/Invalid param'
        });
    }

    user.password = md5(user.password);

    User.findOne(user)
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }
        else {
            jwt.sign({ username: req.body.username }, secretkey, {expiresIn: '1h'}, (err, token) => {
                res.json({
                    access_token: token
                });
            });
        }
    });
});

module.exports = router;