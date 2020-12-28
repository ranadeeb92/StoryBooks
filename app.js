const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const db = require("./config/connectDB");
// handlebars helper
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon,
} = require("./helpers/hbs");
//passport config
require("./config/passport")(passport);
//load Routes
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const storiesRoutes = require("./routes/stories");
//Mongoose connect
db.connect();
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//methodOverride middleware
app.use(methodOverride("_method"));
// handlbars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      truncate: truncate,
      stripTags: stripTags,
      formatDate: formatDate,
      select: select,
      editIcon: editIcon,
    },
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
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

//set static folders
app.use(express.static(path.join(__dirname, "public")));
//use routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/stories", storiesRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
