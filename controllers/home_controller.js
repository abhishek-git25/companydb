const User = require('../models/user');



module.exports.home =  async function (req , res) {
    try {

        if(!req.isAuthenticated()){
            req.flash('error' , 'Your not logged in !')
           return res.redirect('/signIn')
        }
        const loggedInUser = req.user;

        console.log(loggedInUser , "14");

        return res.render('home' , {
            title : 'Home page',
            showHeader : true,
            showFooter : true,
            user : loggedInUser
            
        })
    
        
    } catch (error) {
        console.log(error);
    }
}