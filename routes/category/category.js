const express = require('express');
const router = express.Router();

const Category = require('../../models/Category');

// @route   GET /category
// @desc    Get all categories
// @access  Public
router.get('/', (req, res) => {
    Category.find({})
    .then(result => {
        return res.json(result);
    });
});

module.exports = router;