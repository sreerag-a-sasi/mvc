const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const users = require('../db/models/users');
const bcrypt = require('bcryptjs');

exports.addUser = async function (req, res) {
    try {


        console.log("body : ", req.body);


        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        


        console.log("firstname => ", firstName);
        console.log("lastname => ",lastName);
        console.log("email => ",email);
        console.log("password => ",password); 
        
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                let response = error_function({
                    statusCode: 400,
                    message: "invalid email id",
            });
            
            return res.status(response.statusCode).send(response);
        }
        const count = await users.countDocuments({ email: req.body.email });
        console.log(`Number of documents with the same email: ${count}`);
        if (count>=1) {
            let response = error_function({
                statusCode: 400,
                message: "user with this email id already exist",
            });
            return res.status(response.statusCode).send(response);
        }else{
            let salt = bcrypt.genSaltSync(10);
            console.log("salt : ", salt);
            let hashed_password = bcrypt.hashSync(password, salt);
            console.log("hashed_password : ", hashed_password);
        



        



        //validation
        //failed : error_response
        //success : Continue 
        //Count email
        //if email count greater than zero error_response : email must be unique
        //else continue
        //save to database
        const new_user = await users.create({
            firstName,
            lastName,
            email,
            password: hashed_password,
        });




        if (new_user) {
            let response = success_function({
                statusCode: 201,
                data: new_user,
                message: "User created successfully",
            });
            return res.status(response.statusCode).send(response);
        } else {
            let response = error_function({
                statusCode: 400,
                message: "User creation failed",
            });
            return res.status(response.statusCode).send(response);
        }}
        
    } catch (error) {
        console.log("error : ", error);
        //return res.status(400).send("failed");
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}















exports.updateUser = async function (req, res) {
    try {
        let body = req.body;
        console.log("body : ", body);

            let firstName= req.body.firstName;
            let lastName= req.body.lastName;
            let email= req.body.email;

        const count = await users.countDocuments({ email: req.body.email });
        console.log(`Number of documents with the same email: ${count}`);

        const update_datas =({
            firstName,
            lastName,
            email,
        });
        //save to database

        let id = req.params.id;
        console.log("id : ", id);

        // let _id = new ObjectId(id);
        const update_user = await users.findOneAndUpdate(
            { _id: id },
            { $set: update_datas },
        );

        if (update_user && count===0) {
            let response = success_function({
                statusCode: 201,
                data: update_user,
                message: "User updated successfully",
            });
            return res.status(response.statusCode).send(response);
        } else {
            let response = error_function({
                statusCode: 400,
                message: "User updation failed",
            });
            return res.status(response.statusCode).send(response);
        }
    } catch (error) {
        console.log("error : ", error);
        //return res.status(400).send("failed");
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}



exports.getUser = async function (req, res) {
    try {
        const data = await users.find({});
        console.log("data : ", data);
        const json_data = JSON.stringify(data);
        console.log("json_data : ", json_data);
        if (data) {
            let response = success_function({
                statusCode: 201,
                data: data,
                message: "all users found",
            });
            return res.status(response.statusCode).send(response);
        }
    } catch (error) {
        console.log("error : ", error);
        //return res.status(400).send("failed");
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}








exports.deleteUser = async function (req, res) {
    try {
        let id = req.params.id;
        console.log("id : ", id);
        const deleted_User = await users.findOneAndDelete({ _id: id });
        console.log("deleted user : ", deleted_User);
        if (deleted_User) {
            let response = success_function({
                statusCode: 201,
                data: deleted_User,
                message: "User deleted successfully",
            });
            return res.status(response.statusCode).send(response);
        } else {
            let response = error_function({
                statusCode: 400,
                message: "User deletion failed",
            });
            return res.status(response.statusCode).send(response);
        }
    } catch (error) {
        console.log("error : ", error);
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}








exports.uniqueUser = async function (req, res) {
    try {
        let id = req.params.id;
        console.log("id : ", id);


        // let _id = new ObjectId(id);
        const unique_User = await users.findOne({ _id: id });
        console.log("unique user : ", unique_User);
        if (unique_User) {
            let response = success_function({
                statusCode: 201,
                data: unique_User,
                message: "User found successfully",
            });
            return res.status(response.statusCode).send(response);
        } else {
            let response = error_function({
                statusCode: 400,
                message: "User not found",
            });
            return res.status(response.statusCode).send(response);
        }
    } catch (error) {
        console.log("error : ", error);
        //return res.status(400).send("failed");
        let response = error_function({
            statusCode: 400,
            message: "something went wrong",
        });
        return res.status(response.statusCode).send(response);
    }
}


