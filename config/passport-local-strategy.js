const passport = require('passport');

const localStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");


const user = require('../models/user');

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true,
        },
        async function (req, email, password, done) {
            try {
                const foundUser = await user.findOne({ email });

                if (!foundUser) {
                    req.flash('error', 'Invalid Username/Password');
                    return done(null, false);
                }

                // Use bcrypt.compare to compare the hashed password with the input password
                const passwordMatch = await bcrypt.compare(password, foundUser.password);

                if (!passwordMatch) {
                    req.flash('error', 'Invalid Username/Password');
                    return done(null, false);
                }

                // Authentication successful, return the user
                return done(null, foundUser);
            } catch (error) {
                req.flash('error', error);
                return done(error);
            }
        }
    )
);


passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    try {
        user.findById(id)
            .then((result) => {
                return done(null, result)
            })
    } catch (error) {
        console.log("Error in handling the user --> Passport");
        return done(error)
    }
})

passport.checkAuthentication = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Sign In first!')
    return res.redirect('/signIn');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;