const express = require('express');
const router = express.Router();

const Image = require('../../models/Image');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secretkey = require('../../config/tokensecretkey').tokenSecretKey;

const upload = multer({
    dest: `${__dirname}/../../data/images`
});

// @route   POST /image/upload
// @desc    upload image
// @access  Public
router.post('/upload', upload.single('avatar'), (req, res) => {
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

// @route   GET /image
// @desc    get image
// @access  Public
router.get('/:id', (req, res) => {
    Image.findById(req.params.id)
    .then(image => {
        if (!image){
            return res.status(404).json({
                message: "Content not found"
            });
        }
        res.sendFile('../../' + image.path);
    });
});

module.exports = router;