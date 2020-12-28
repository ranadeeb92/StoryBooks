const express = require("express");
const indexController = require("../controllers/index");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");
const router = express.Router();

router.get("/", ensureGuest, indexController.getindex);
router.get("/about", indexController.getAbout);
//get user stories only
router.get("/dashboard", ensureAuthenticated, indexController.getDashboard);

module.exports = router;
