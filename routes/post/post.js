const express = require('express');
const router = express.Router();

const Post = require('../../models/Post');
const Category = require('../../models/Category');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secretkey = require('../../config/tokensecretkey').tokenSecretKey;

// @route   GET /post/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
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

// @route   GET /post/category/:name
// @desc    Get list of posts by category
// @access  Public
router.get('/category/:categoryname', (req, res) => {
    let category = req.params.categoryname;
    Category.findOne({name: category})
    .then(category => {
        if (!category) {
            return res.status(404).json({
                message: "This category does not exists"
            });
        }
        limit = Number(req.query.limit)
        Post.find({category: req.params.categoryname})
        .limit(limit)
        .then(posts => {
            res.json(posts);
        });
    });
});

// @route   POST /post/add
// @desc    Add post
// @access  Verified user
router.post('/add', (req, res) => {
    if (!req.body.access_token || !req.body.name || !req.body.content || !req.body.category)
        return res.status(400).json({
            message: "Missing/Invalid params"
        });

    token = req.body.access_token;
    jwt.verify(token, secretkey, (err, data) => {
        if (err){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        else {
            // create html contain post content
            let storeFolder = `${__dirname}/../../data/posts/${req.body.category}`;
            let fileName = `${Number(Date.now())}.html`;
            if (!fs.existsSync(storeFolder)) fs.mkdirSync(storeFolder, {recursive: true});
            fs.writeFile(storeFolder + '/' + fileName, req.body.content, (err) => {
                if(err) {
                    return res.status(500).json({
                        message: "Server error"
                    });
                }
                Category.findOne({"name": req.body.category})
                .then(category => {
                    if (!category) {
                        return res.status(404).json({
                            message: "This category does not exists"
                        });
                    }
                    let newPost = {
                        name: req.body.name,
                        username: data.username,
                        description: req.body.description,
                        content: `data/posts/${req.body.category}/${fileName}`,
                        category: req.body.category
                    }
                
                    newPost = new Post(newPost);
                    newPost.save()
                    .then(post => {
                        res.json(post)
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Server error'
                        });
                    });
                });
            });
        }
    });
});

module.exports = router;