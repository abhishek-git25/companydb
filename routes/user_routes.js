const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');


router.get('/signUp' , userController.signup);
router.get('/signIn' , userController.signIn);
router.post('/login' , userController.login)
router.post('/create' , userController.create);
router.post('/create-session' ,passport.authenticate(
    'local',
    {failureRedirect : '/signIn'},
), userController.createSession);

router.get('/logout' , userController.logout)

module.exports = router