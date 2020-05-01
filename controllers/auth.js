const passport = require("passport");

module.exports = {
  getDashboard: async function (req, res, next) {
    res.redirect("/dashboard");
  },
};
