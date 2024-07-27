const mongoose = require('mongoose');

// const users = require('../db/models/users');

async function connect() {
    try {
       await mongoose.connect('mongodb://localhost:27017');
       console.log("Database connection established..."); 
    } catch (error) {
        console.log("error : ", error);
    }
}


module.exports = connect;