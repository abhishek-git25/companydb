const Students = require('../models/students')


module.exports.students = async function (req, res) {
    try {

        const allStudents = await Students.find({})
        console.log(allStudents , "8");


        return res.render('students', {
            title: 'Students',
            showHeader: true,
            showFooter: true,
            students : allStudents,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.addStudents = async function (req, res) {
    try {
        const { name, college, status, dsaFinalScore, webDFinalScore, reactFinalScore } = req.body;

        const newStudent = new Students({
            studentDetails: { name, college, status },
            courseScores: {
                dsaFinalScore, webDFinalScore, reactFinalScore
            }
        })
        // console.log(req , "xhr true", "30");
        const savedStudent = await newStudent.save();
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    students: savedStudent
                },
                message: 'Student added'
            })
        }
        req.flash('success', 'Student added successfully');
        return res.redirect('back')

    } catch (error) {
        req.flash('error', error)
        console.log(error, "error");
        return;
    }
}