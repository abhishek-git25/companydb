


let studentForm = $('#create-student-form');

studentForm.on('submit', function (e) {
    console.log('submitted form', '7');
    e.preventDefault();
    // fetch(url, {
       
    // });
    $.ajax({
        type: 'POST', // Use POST method
        url: '/students/addstudents', // Specify the correct URL
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        data: studentForm.serialize(),
        success: function (data) {
            console.log(data, "13");
            displayStudents(data);
        },
        error: function (error) {
            console.error(error); // Log any errors
            // Handle the error as needed
        }
    });
});



let displayStudents = function (student) {
    console.log(student, "20");
}
console.log("my js file" , "2");

