const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCommentSchema = new Schema({
    commentid: {
        type: String,
        required: true
    }
});

const CommentSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_modified: {
        type: Date,
        default: Date.now()
    },
    postid: {
        type: String,
        required: true
    },
    subcomments: {
        type: [SubCommentSchema],
        default: []
    }
});

const Comment = mongoose.model('comments', CommentSchema)
module.exports = Comment