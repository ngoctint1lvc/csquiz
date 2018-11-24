const express = require('express');
const router = express.Router();
const md5 = require('js-md5');

const User = require('../../models/User');
const LoginUser = require('../../models/LoginUser');

// @route   POST /user/register
// @desc    Register an user
// @access  Public
router.post('/', (req, res) => {
    let newUser = {
        username: req.body.username,
        display_name: req.body.display_name || req.body.username,
        password: req.body.password
    };

    if (!newUser.username || !newUser.password){
        return res.status(400).json({
            message: 'Missing/Invalid param'
        });
    }

    // hash md5 for user password
    newUser.password = md5(newUser.password);

    newUser = new User(newUser);
    newUser.save()
    .then(user => res.json(user))
});

module.exports = router;