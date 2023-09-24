const express = require('express');
const passport = require('passport')
const router = express.Router();

const interviewController = require('../controllers/interview_controller');

router.get('/interviews', interviewController.interviews);
router.post('/interviews/allocatestudents', interviewController.allocateStudents)
router.get('/interview/:interviewId/students', interviewController.getAllocatedStudents)
router.post('/update-result/:interviewId/:studentId' , interviewController.updateInterviewStatus)



module.exports = router