const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userid: {
        type: String,
        required: true
    }
});

const CommentSchema = new Schema({
    commentid: {
        type: String,
        required: true
    }
});

const PostSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: {
        type: [UserSchema],
        default: []
    },
    comments: {
        type: [CommentSchema],
        default: []
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true
    }
});

Post = mongoose.model('posts', PostSchema)
module.exports = Post