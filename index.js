const express = require("express");
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const flash = require("express-flash");
const db = require("./config/mongoose");
const mongoStore = require("connect-mongo");
const app = express();
const port = 8000;
const path = require("path");
// const checkSessionTimeout = require('./config/middleware').checkSessionTimeout
const expressLayouts = require("express-ejs-layouts");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
console.log(secretKey);

app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));



app.use(
  "/css",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "css")
  )
);
app.use(
  "/js",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "js")
  )
);


// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
// app.use(checkSessionTimeout);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set('views', __dirname + '/views'); // Specify the views directory




app.use(
  session({
    name: "CompanydB",
    secret: secretKey, // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // Session expiration time in milliseconds (1 hour in this example)
    },
    store: mongoStore.create({
      mongoUrl: 'mongodb://0.0.0.0/companydb',
      mongooseConnection: db,
      autoRemove: 'disabled'
    }),
  })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.set("view engine", "ejs");

app.use(flash());



app.use("/", require("./routes/index"));



app.listen(port, function (err) {
  if (err) {
    console.log(`error running the server${err}`);
  }
  console.log(`Server is running on : ${port}`);
});
