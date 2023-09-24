const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    company: String,
    result: {
        type: String,
        enum: ['PASS', 'FAIL', 'On Hold', 'Didnt Attempt']
    }
})

const results = mongoose.model('results' , resultSchema);

module.exports = results