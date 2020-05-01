const passport = require("passport");

module.exports = {
  getAuthUser: async function (req, res, next) {
    if (req.user) {
      console.log(req.user);
    } else {
      console.log("Not Auth");
    }
  },
  logout: async function (req, res, next) {
    req.logout();
    res.redirect("/");
  },
};
