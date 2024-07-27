let error_function = require('./response-handler').error_function;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user_types = require('../db/models/user_types');
const control_data = require('./control-data.json');
dotenv.config();

exports.access_control = async function (access_types, req, res, next) {
    try {
        console.log("reached access control....");
        const authHeader = req.headers['authorization'];
        console.log("authHeader  : ",authHeader);

        //validate if authHeader not found
        if(!authHeader) {
            let response = error_function({
                statuscode : 400,
                message : "Not allowed",
            });
            return res.status(response.statusCode).send(response);
        }

        const headerArr = authHeader.split(' ');
        console.log("headerArr :",headerArr);

        //validate if header array contains no elements
        if (headerArr.length < 1) {
            let response = error_function({
                statuscode : 400,
                message: "You must login ",
            });
            return res.status(response.statusCode).send(response);
        }

        let token = headerArr[1];
        console.log("token :", token);

        //validating token
        if(!token || token=='' || token==null || token== undefined || token== 'null' || token == 'undefined') {
            let response = error_function({
                statuscode : 400,
                message: "Please login to continue",
            });
            return res.status(response.statusCode).send(response);
        }else{
            jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded)=> {
                if(err) {
                    let response = error_function({
                        statusCode : 400,
                        message : err.message ? err.message : 'invalid token'
                    });
                    return res.status(response.statusCode).send(response);
                }else {
                    let user_id = decoded.user_id;
                    console.log("user_id : ",user_id);

                    if (user_id) {
                        let user = await users.findOne({_id : user_id}).populate('user_type');
                        console.log("user :",user);

                        let user_type = user.user_type.user_type;
                        console.log("uaer_type : ", user_type);

                        //allowed user_types
                        let allowed = access_types.split(',').map((e) => control_data(e));
                        console.log("allowed : ", allowed);

                        if (user && allowed.includes(user_type)) {
                            console.log("allowed user...")
                            next(); //jupmp to next middleware
                        }else if (!allowed.includes(user_type)) {
                            let response = error_function({
                                statusCode : 400,
                                message : "Not allowed",
                            });
                            return res.status(response.statusCode).send(response);
                        }else if(!user) {
                            let response = error_function({
                                statusCode : 404,
                                message : "user not fount",
                            });
                            return res.status(response.statusCode).send(response);
                        }else {
                            let response = error_function({
                                statusCode : 400,
                                message : "something went wrong",
                            });
                            return res.status(response.statusCode).send(response);
                        }
                    }else{
                        let response = error_function({
                            statusCode : 400,
                            message : "Not a valid user",
                        });
                        return res.status(response.statusCode).send(response);
                    }
                    
                }
            });
        }
    } catch (error) {
        console.log("error : ", error);
        let response = error_function({
            statusCode : 400,
            message: error.message ? error.message : 'something went wrong'
        });
        return res.status(response.statusCode).send(response);
    };
}