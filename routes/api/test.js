const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const LoginUser = require('../../models/LoginUser');

// @route   GET api/test
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
});

// @route   POST api/test
// @desc    Add 1 users
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        role: req.body.role || undefined,
        display_name: req.body.display_name,
        password: req.body.password,
        avatar: req.body.avatar || undefined
    });

    newUser.save()
    .then(user => res.json(user))
});

// @route   DELETE api/test/:id
// @desc    Delete 1 users
// @access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        // console.log(user);
        user.delete()
        .then(() => res.json({success: true}));
    })
    .catch(err => {
        console.log(err);
        res.json({success: false});
    })
});

router.post('/loginuser', (req, res) => {
    console.log('hello')
    const loginUser = new LoginUser({
        username: req.body.username,
        access_token: req.body.access_token,
        expireAfterSeconds: req.body.expireAfterSeconds || undefined
    });

    loginUser.save()
    .then(user => res.json(user))
});

module.exports = router;