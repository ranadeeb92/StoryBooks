const express = require("express");
const authController = require("../controllers/auth");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res, next) => {
    res.redirect("/dashboard");
  }
);

router.get("/verify", authController.getAuthUser);
router.get("/logout", authController.logout);
module.exports = router;
