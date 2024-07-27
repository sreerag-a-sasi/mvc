'use strict';

const user_types = require("../models/user_types");

module.exports = {
  up: (models, mongoose) => {
    return models.users.insertMany([
      {
        _id:'6697895aa8d99d424db23cb6',
        firstName: "sreerag a",
        lastName: "sasi",
        email: "sreeragakhd2002@gmail.com",
        password: "$2a$10$R6ZtACPAJ6Jo6hZMlDodbOdlHSWNcakh7vGY86pB7tyXmFCOZ0D.q",//password===password
        user_type : "6697895aa8d99d424db23cb6",//admin
      }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {

      return models.users.deleteMany([
        {
          _id : {
            $in : [
              "668bb6fdfaa2016df7cef426",
            ]
          }
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};
