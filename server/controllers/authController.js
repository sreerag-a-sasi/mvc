const users = require('../db/models/users');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const sendEmail = require("../utils/send-email").sendEmail;
const resetPassword = require("../utils/resetpassword").resetPassword;
const set_password_template =require("../utils/set-password").resetPassword;
dotenv.config();

exports.login = async function (req, res) {
  try {
    let email = req.body.email;
    console.log("email : ", email);

    let password = req.body.password;
    console.log("password : ", password);

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

    if (email) {
      let user = await users.findOne({ email: email });
      if (user) {
        let reset_token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10m" });
        let data = await users.updateOne(
          { email: email },
          { $set: { password_token: reset_token } }
        );
        if (data.matchedCount === 1 && data.modifiedCount == 1) {
          let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
          let email_template = await resetPassword(user.first_name, reset_link);
          sendEmail(email, "Forgot password", email_template);
          let response = success_function({
            status: 200,
            message: "Email sent successfully",
          });
          res.status(response.statusCode).send(response);
          return;
        } else if (data.matchedCount === 0) {
          let response = error_function({
            status: 404,
            message: "User not found",
          });
          res.status(response.statusCode).send(response);
          return;
        } else {
          let response = error_function({
            status: 400,
            message: "Password reset failed",
          });
          res.status(response.statusCode).send(response);
          return;
        }
      } else {
        let response = error_function({ status: 403, message: "Forbidden" });
        res.status(response.statusCode).send(response);
        return;
      }
    } else {
      let response = error_function({
        status: 422,
        message: "Email is required",
      });
      res.status(response.statusCode).send(response);
      return;
    }
  } catch (error) {
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
      return;
    } else {
      let response = error_function({ status: 400, message: error });
      res.status(response.statusCode).send(response);
      return;
    }
  }
};





exports.passwordResetController = async function (req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    let password = req.body.password;

    decoded = jwt.decode(token);
    //console.log("user_id : ", decoded.user_id);
    //console.log("Token : ", token);
    let user = await users.findOne({$and: [{ _id: decoded.user_id }, { password_token: token }],});
    if (user) {
      let salt = bcrypt.genSaltSync(10);
      let password_hash = bcrypt.hashSync(password, salt);
      let data = await users.updateOne(
        { _id: decoded.user_id },
        { $set: { password: password_hash, password_token: null } }
      );
      if (data.matchedCount === 1 && data.modifiedCount == 1) {
        let response = success_function({
          status: 200,
          message: "Password changed successfully",
        });
        res.status(response.statusCode).send(response);
        return;
      } else if (data.matchedCount === 0) {
        let response = error_function({
          status: 404,
          message: "User not found",
        });
        res.status(response.statusCode).send(response);
        return;
      } else {
        let response = error_function({
          status: 400,
          message: "Password reset failed",
        });
        res.status(response.statusCode).send(response);
        return;
      }
    } else {
      let response = error_function({ status: 403, message: "Forbidden" });
      res.status(response.statusCode).send(response);
      return;
    }
  } catch (error) {
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
      return;
    } else {
      let response = error_function({ status: 400, message: error });
      res.status(response.statusCode).send(response);
      return;
    }
  }
};


// exports.details = async function ( req, res) {
//     try {
//         req.body;

//         let response = success_function({
//             statusCode : 200,
//             data : token,
//             message : "Login successful",
//         });
//         return res.status(response.statusCode).send(response);
//     } catch (error) {
//         console.log("error : ",error);
//     }
// }