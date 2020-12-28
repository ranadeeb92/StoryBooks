const Story = require("../models/story");

module.exports = {
  getindex: async function (req, res, next) {
    res.render("index/welcome");
  },
  getAbout: async function (req, res, next) {
    res.render("index/about");
  },
  getDashboard: async function (req, res, next) {
    const userId = req.user.id;
    const stories = await Story.find({ user: userId }).populate("user");
    if (stories) {
      res.render("index/dashboard", {
        stories: stories,
      });
    }
  },
};
