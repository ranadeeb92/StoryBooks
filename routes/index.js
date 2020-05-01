const express = require("express");
const indexController = require("../controllers/index");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index/welcome");
});
router.get("/dashboard", indexController.getDashboard);

module.exports = router;
