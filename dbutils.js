const User = require('../../models/User');

function addUser(user){
    let newUser = {
        username: user.username,
        password: user.password
    }

    if (user.role) newUser.role = user.role;
    newUser.display_name = (user.display_name)? user.display_name : user.username;
    if (user.avatar) newUser.avatar = user.avatar;

    newUser = new User(newUser);
    newUser.save()
    .then(user => callBack(user));
}

module.exports = {
    addUser
}