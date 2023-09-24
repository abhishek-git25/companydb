const express = require('express');
const router = express.Router();

const jobController = require('../controllers/job_controller')

router.get('/jobs' , jobController.jobs)

module.exports = router