const Students = require('../models/students')
const Interview = require('../models/interview')


module.exports.interviews = async function (req, res) {
    try {
        let students = await Students.find({});
        const interviews = await Interview.find().populate('students.student');
        console.log(interviews, "9");
        return res.render('interview', {
            title: 'Interview',
            showHeader: true,
            showFooter: true,
            students: students,
            interviewList: interviews
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports.allocateStudents = async function (req, res) {
    try {
        const { interviewDate, company, studentId } = req.body;
        const newInterview = new Interview({
            interviewDate,
            company,
            students: [{ student: studentId }]
        })
        await newInterview.save();
        req.flash('success', 'Interview allocated successfully');
        return res.redirect('back')
    } catch (error) {
        req.flash('error', error);
        return;
    }
}

module.exports.getAllocatedStudents = async function (req, res) {
    try {
        const interviewId = req.params.interviewId;

        const interview = await Interview.findById(interviewId).populate('students.student');

        if (!interview) {
            req.flash('error', 'Interview not found');
            return res.redirect('back');
        }

        const students = interview.students.map((allocation) => ({
            studentId: allocation.student._id,
            name: allocation.student.studentDetails.name,
            resultStatus: allocation.resultStatus,
        }));

        return res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching students of the interview' });
    }
}

module.exports.updateInterviewStatus = async function (req, res) {
    try {

        const { interviewId, studentId } = req.params;

        const { resultStatus } = req.body;

        const interview = await Interview.findById(interviewId);

        if (!interview) {
            req.flash('error', 'No interview found!')
            res.redirect('back')
        }

        const studentsAllocation = interview.students.find((allocated) =>
            allocated.student.toString() === studentId
        )

        if (!studentsAllocation) {
            req.flash('error', 'No student found!');
            return res.status(404).json({ message: "Student not found !" })
        }

        studentsAllocation.resultStatus = resultStatus;
        await interview.save();

        req.flash('success', "Status updated successfully!")
        res.status(200).json({ message: 'Result status updated successfully' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating result status' });
    }
}
