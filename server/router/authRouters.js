const express = require('express');
const router  = express.Router();
const authController = require('../controllers/authController');
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




router.post('/login',authController.login);
router.post('/forgot-password',authController.forgotPasswordController);
router.patch('/reset-password',authController.passwordResetController);
// router.get('/details',authController.details);

module.exports = router;