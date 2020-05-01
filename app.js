const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
//passport config
require("./config/passport")(passport);
//load Routes
const authRoutes = require("./routes/auth");
const port = process.env.PORT || 5000;

const app = express();
//use routes
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
