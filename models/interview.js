const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    interviewDate: {
      type: Date,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'students', // Ensure 'students' matches the actual collection name
        },
        resultStatus: {
          type: String,
          enum: ['Pending', 'Passed', 'Failed'],
          default: 'Pending',
        },
      },
    ],
  });
  
const interview = mongoose.model('interview', interviewSchema);

module.exports = interview;