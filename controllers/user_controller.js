const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");

module.exports.signup = function (req, res) {
  return res.render("signup", {
    title: "Sign Up",
    showHeader: false,
    showFooter: false,
    messages: req.flash(),
  });
};

module.exports.signIn = function (req, res) {
  return res.render("signIn", {
    title: "Sign In",
    showFooter: false,
    showHeader: false,
  });
};

module.exports.login = async function (req, res) {

  //  this passport login

  if (req.isAuthenticated()) {
    req.flash('success', 'Logged in successully')
    return res.redirect('/');
  }
  return res.render('signIn', {
    title: 'SignIn'
  })



  // this is manual login

  // try {
  //   const { email, password } = req.body;

  //   const foundUser = await User.findOne({ email });

  //   if (!foundUser) {
  //     req.flash("error", "User not found !");
  //     return res.redirect("/signIn");
  //   }

  //   const passwordMatch = await bcrypt.compare(password, foundUser.password);
  //   if (!passwordMatch) {
  //     req.flash("error", "Invalid email/password!");
  //     return res.redirect("/signIn");
  //   }

  //   const token = jwt.sign({ userId: foundUser._id }, secretKey, {
  //     expiresIn: "2h",
  //   });

  //   req.session.token = token;

  //   req.flash("success", "Logged in successfully");
  //   return res.redirect("/");
  // } catch (error) {
  //   req.flash("error", "An error occurred");
  //   res.status(500).send("Internal Server Error");
  // }
};

module.exports.create = async function (req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Password did not match");
      return res.redirect("back");
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      req.flash("error", "User already exists");
      return res.redirect("/signUp");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    req.flash("success", "User created successfully");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", "An error occurred");
    res.status(500).send("Internal Server Error");
  }
};

module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully')
  console.log("hello");
  return res.redirect('/');
}

module.exports.logout = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error(err);
    }
    req.flash('success', 'Logged out successfully');
    res.redirect('/signin');
  });

}