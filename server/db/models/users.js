const mongoose = require('mongoose');

const users = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
});


module.exports = mongoose.model("users", users);