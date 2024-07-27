'use strict';

module.exports = {
  up: (models, mongoose) => {

      return models.user_types.insertMany([
        {
          _id : "6697895aa8d99d424db23cb6",
          user_type : "Admin"
        },
        {
          _id : "668bb6fdfaa2016df7cef426",
          user_type : "Employee"
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {

      return models.Test.deleteMany(
        {
          _id: {
            $in : [
              "6697895aa8d99d424db23cb6",
              "668bb6fdfaa2016df7cef426",
            ]
          }
        }
    ).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};
