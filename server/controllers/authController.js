const users = require('../db/models/users');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async function ( req, res) {
    try {
        let email = req.body.email;
        console.log("email : ", email);

        let password = req.body.password;
        console.log("password : ",password);

        //validate email and password

        //checking user credentials 
        let user = await users.findOne({email});
        console.log("User : ",user);

        if(user) { 
            console.log("User found");
            let db_password = user.password;

            let passwordsMatching = await bcrypt.compare(password, db_password)
            console.log("passwordMatching : ", passwordsMatching);
            

            if(passwordsMatching) { 

                //generating JWT token
                let token = jwt.sign({user_id : user._id},process.env.PRIVATE_KEY,{expiresIn : "10d"});
                let response = success_function({
                    statusCode : 200,
                    data : token,
                    message : "Login successful",
                });
                return res.status(response.statusCode).send(response);
            }else{
                let response = error_function({
                    statusCode : 400,
                    message : "wrong password",
                });
                return res.status(response.statusCode).send(response);
            }
        }else {
            let response = error_function({
                statusCode : 404,
                message : "User not found",
            });
            return res.status(response.statusCode).send(response);
        }
    } catch (error) {
        console.log("error : ",error);
    }
}







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