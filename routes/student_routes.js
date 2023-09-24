const express = require('express');
const passport = require('passport')
const router = express.Router();

const studentController = require('../controllers/student_controller');
const allDataController = require('../controllers/student_data_controller');

router.get('/students', studentController.students);

router.post('/students/addstudents', passport.checkAuthentication, studentController.addStudents);
router.get('/students/allData' , allDataController.getAllData)
router.get('/download-csv' ,passport.checkAuthentication, allDataController.downloadCsv)

module.exports = router