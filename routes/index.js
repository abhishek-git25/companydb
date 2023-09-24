const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');



router.use(express.json()); 


router.get('/' , homeController.home);
router.use('/' , require('./user_routes'));
router.use('/' , require('./student_routes'));

router.use('/' , require('./interview_routes'))
router.use('/' , require('./job_routes'))
// router.use('/' , require('./user_routes'));

module.exports = router;


