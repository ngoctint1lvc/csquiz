const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const secretkey = require('../../config/tokensecretkey').tokenSecretKey;

// @route   GET /user/me
// @desc    Get information of user
// @access  Verified user with access_token
router.post('/', (req, res) => {
    token = req.body.access_token;
    if (!token){
        return res.status(400).json({
            message: 'Missing/Invalid params'
        });
    }

    jwt.verify(token, secretkey, (err, data) => {
        if (err){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        else {
            username = data.username;
            User.findOne({username})
            .then(user => {
                res.json(user);
            });
        }
    });
});

module.exports = router;