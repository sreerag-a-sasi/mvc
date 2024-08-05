'use strict';

module.exports = {
  up: (models, mongoose) => {

      return models.user_types.insertMany([
        {
          _id : "66b0bf59b5d83c8f0b66fed4",
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
              "66b0bf59b5d83c8f0b66fed4",
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