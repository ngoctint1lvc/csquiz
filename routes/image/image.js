const express = require('express');
const router = express.Router();

const Image = require('../../models/Image');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secretkey = require('../../config/tokensecretkey').tokenSecretKey;

// @route   POST /image/upload
// @desc    upload image
// @access  Public
router.get('/upload', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if (!post){
            return res.status(404).json({
                message: "Content not found"
            });
        }
        fs.readFile(__dirname + '/../../' + post.content, (err, data) => {
            if (err) {
                return res.status(404).json({
                    message: "Content not found"
                });
            }
            post.content = data;
            res.json(post);
        });
    });
});

module.exports = router;