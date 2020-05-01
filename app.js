const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const db = require("./config/connectDB");
//passport config
require("./config/passport")(passport);
//load Routes
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
//Mongoose connect
db.connect();
const app = express();
// handlbars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//seesion and cookie middleware
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//use routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
