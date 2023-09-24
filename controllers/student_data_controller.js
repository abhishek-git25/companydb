const Students = require('../models/students');
const Interview = require('../models/interview');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');



module.exports.getAllData = async function (req, res) {
    try {
        const interviewsData = await Interview.find({}).populate({
            path: 'students.student',
            model: 'students', // Ensure 'students' matches the actual collection name
        });

        return res.render('studentdata', {
            title: "Students Data",
            interviews: interviewsData,
            showHeader: true,
            showFooter: true
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

module.exports.downloadCsv = async function (req, res) {
    try {
        const interviews = await Interview.find({})
            .populate({
                path: 'students.student',
                model: 'students',
                select: 'studentDetails courseScores',
            });

        const csvWriter = createCsvWriter({
            path: path.join(__dirname, 'interviews.csv'),
            header: [
                { id: 'studentId', title: 'Student Id' },
                { id: 'name', title: 'Student Name' },
                { id: 'college', title: 'Student College' },
                { id: 'dsaFinalScore', title: 'DSA Final Score' },
                { id: 'webDFinalScore', title: 'WebD Final Score' },
                { id: 'reactFinalScore', title: 'React Final Score' },
                { id: 'interviewDate', title: 'Interview Date' },
                { id: 'company', title: 'Interview Company' },
                { id: 'status', title: 'Interview Result' },
            ],
        })

        const csvData = [];
        interviews.forEach((interview) => {
            interview.students.forEach((studentData) => {
                const student = studentData.student;
                csvData.push({
                    studentId: student._id,
                    name: student.studentDetails.name,
                    college: student.studentDetails.college,
                    dsaFinalScore: student.courseScores.dsaFinalScore,
                    webDFinalScore: student.courseScores.webDFinalScore,
                    reactFinalScore: student.courseScores.reactFinalScore,
                    interviewDate: new Date(interview.interviewDate).toLocaleDateString(),
                    company: interview.company,
                    status: student.studentDetails.status,
                });
            });
        });

        await csvWriter.writeRecords(csvData);
        res.download(path.join(__dirname, 'interviews.csv'))

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');

    }
}

