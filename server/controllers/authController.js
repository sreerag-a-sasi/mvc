const users = require('../db/models/users');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { log } = require('console');
const user_types = require('../db/models/user_types');
const sendEmail = require("../utils/send-email").sendEmail;
const resetPassword = require("../utils/resetpassword").resetPassword;




dotenv.config();

exports.login = async function (req, res) {
  try {
    let email = req.body.email;
    console.log("email : ", email);

    let password = req.body.password;
    console.log("password : ", password);

    // let user_type = req.body.user_type;
    // console.log("user type ac : ", user_type);
    
    //validate email and password

    //checking user credentials 
    let user = await users.findOne({ email });
    console.log("User : ", user);

    if (user) {
      console.log("User found");
      let db_password = user.password;

      let passwordsMatching = await bcrypt.compare(password, db_password)
      console.log("passwordMatching : ", passwordsMatching);


      if (passwordsMatching) {

        //generating JWT token
        let token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });
        let response = success_function({
          statusCode: 200,
          data: token,
          message: "Login successful",
        });
        return res.status(response.statusCode).send(response);
      } else {
        let response = error_function({
          statusCode: 400,
          message: "wrong password",
        });
        return res.status(response.statusCode).send(response);
      }
    } else {
      let response = error_function({
        statusCode: 404,
        message: "User not found",
      });
      return res.status(response.statusCode).send(response);
    }
  } catch (error) {
    console.log("error : ", error);
  }
}



exports.forgotPasswordController = async function (req, res) {
  try {
    let email = req.body.email;
    console.log("email: ", email);

    if (email) {
      let user = await users.findOne({ email: email });
      if (user) {
        console.log("user found...");

        let reset_token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });
        console.log("reset_token : ", reset_token);

        let data = await users.updateOne(
          { email: email },
          // reset_token,
          { $set: { password_token: reset_token } }
        );

        if (user) {
          console.log("matched");

          // let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
          let reset_link = `${process.env.FRONTEND_URL}?token=${reset_token}`;
          console.log("reset_link : ", reset_link);

          let email_template = await resetPassword(user.firstName, reset_link);
          sendEmail(email, "reset-password", email_template);
          let response = success_function({
            statusCode: 200,
            message: "Email sent successfully",
          });
          res.status(response.statusCode).send(response);
          return;
        } else if (data.matchedCount === 0) {
          let response = error_function({
            statusCode: 404,
            message: "User not found",
          });
          res.status(response.statusCode).send(response);
          return;
        } else {
          let response = error_function({
            statusCode: 400,
            message: "Password reset failed",
          });
          res.status(response.statusCode).send(response);
          return;
        }
      } else {
        let response = error_function({ statusCode: 403, message: "Forbidden" });
        res.status(response.statusCode).send(response);
        return;
      }
    } else {
      let response = error_function({
        statusCode: 422,
        message: "Email is required",
      });
      res.status(response.statusCode).send(response);
      return;
    }
  } catch (error) {
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        statusCode: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
      return;
    } else {
      let response = error_function({ statusCode: 400, message: error });
      res.status(response.statusCode).send(response);
      return;
    }
  }
};


exports.passwordResetController = async function (req, res) {
  try {
      console.log("Reached here...");

      // const authHeader = req.headers["authorization"];
      // const token = authHeader.split(" ")[1];
      // // let url;

      const password = req.body.password;
      console.log("Password here:", password);
      const currentUrl = req.body.currentUrl;
      console.log("backendn url : ", currentUrl);
      

      const token = currentUrl.split("=")[1];
      console.log("Token:", token);

      const decoded = jwt.decode(token);
      console.log("User ID:", decoded.user_id);
      console.log("Token:", token);

      const user = await users.findOne({
          $and: [{ _id: decoded.user_id }, { password_token: token }],
      });

      if (user) {
          const salt = bcrypt.genSaltSync(10);
          const password_hash = bcrypt.hashSync(password, salt);

          const data = await users.updateOne(
              { _id: decoded.user_id },
              { $set: { password: password_hash, password_token: null } }
          );

          if (data.matchedCount === 1 && data.modifiedCount === 1) {
              const response = success_function({
                  statusCode: 200,
                  message: "Password changed successfully",
              });
              res.status(response.statusCode).send(response);
          } else if (data.matchedCount === 0) {
              const response = error_function({
                  status: 404,
                  message: "User not found",
              });
              res.status(response.statusCode).send(response);
          } else {
              const response = error_function({
                  statusCode: 400,
                  message: "Password reset failed",
              });
              res.status(response.statusCode).send(response);
          }
      } else {
          const response = error_function({
              statusCode: 403,
              message: "Forbidden",
          });
          res.status(response.statusCode).send(response);
      }
  } catch (error) {
      const errorMessage = error ? (error.message || error) : "Something went wrong";
      const response = error_function({
          statusCode: 400,
          message: errorMessage,
      });

      res.status(response.statusCode).send(response);
  }
};
