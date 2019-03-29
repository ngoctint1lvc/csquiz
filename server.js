const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const apiTest = require('./routes/api/test');
const apiUserLogin = require('./routes/user/login');
const apiUserRegister = require('./routes/user/register');
const apiUserInfo = require('./routes/user/me');
const apiPost = require('./routes/post/post');
const apiCategory = require('./routes/category/category');
const apiImage = require('./routes/image/image')

app.use(bodyParser.json());
app.use(cors());

mongoKey = require('./config/mongokey').mongoURI;
mongoose.connect(mongoKey, {useNewUrlParser: true})
    .then(() => {
        console.log('mongodb connected ...');
    })
    .catch(err => {
        console.log(err);
    });

// define routes
app.use('/api/test', apiTest);
app.use('/user/login', apiUserLogin);
app.use('/user/register', apiUserRegister);
app.use('/user/me', apiUserInfo);
app.use('/post', apiPost);
app.use('/category', apiCategory);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port} ...`);
});