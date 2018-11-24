const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    }
});

LoginUser = mongoose.model('login_users', LoginUserSchema)
module.exports = LoginUser