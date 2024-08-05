'use strict';

const user_types = require("../models/user_types");


module.exports = {
  up: (models, mongoose) => {
    return models.users.insertMany([
      {
        _id:'66b0bc5cb5d83c8f0b66fecd',
        firstName: "sreerag a",
        lastName: "sasi",
        email: "sreeragakhd2002@gmail.com",
        password: "$2a$10$R6ZtACPAJ6Jo6hZMlDodbOdlHSWNcakh7vGY86pB7tyXmFCOZ0D.q",//password===password
        user_type : "66b0bf59b5d83c8f0b66fed4",//admin
      }
      ]).then(res => {      
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {

      return models.users.deleteMany(
        {
        
          _id : {
            $in : [
              "66b0bc5cb5d83c8f0b66fecd",
            ]
          
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};