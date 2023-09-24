const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batch',
    },
    studentDetails: {
        name: String,
        college: String,
        status: {
            type: String,
            enum: ['placed', 'not_placed'],
        },
    },
    courseScores: {
        dsaFinalScore: Number,
        webDFinalScore: Number,
        reactFinalScore: Number,
    },
});

const students = mongoose.model('students', studentSchema);

module.exports = students;
