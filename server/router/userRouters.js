const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const access_control = require('../utils/access-control').access_control;


//Function that returns a middleware
function setAccessControl(access_types) {
    return (req, res, next) => {
        access_control(access_types, req, res, next);
    }
}

router.get('/test', (req,res) => {
    res.status(200).send("success");
});
router.post('/users',setAccessControl('1,2'), userController.addUser);
router.put('/users/:id', userController.updateUser);
router.get('/users', userController.getUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/user/:id', userController.uniqueUser);
// router.get('/login',userController.getUser);

module.exports = router;