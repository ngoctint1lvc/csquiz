const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    postid: {
        type: String,
        required: true
    }
})

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    display_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    points: {
        type: Number,
        default: 0
    },
    bookmarks: {
        type: [PostSchema],
        default: []
    },
    posts: {
        type: [PostSchema],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    }
});

const User = mongoose.model('users', UserSchema)
module.exports = User