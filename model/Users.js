
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSignup = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    pass: {
        type: String,
        require: true,
        unique : true
    },
})
const USERSIGNUP = mongoose.model("USERSIGNUP", userSignup);
module.exports = USERSIGNUP


userSignup.plugin(passportLocalMongoose);

module.exports = mongoose.model('USERSIGNUP', userSignup)