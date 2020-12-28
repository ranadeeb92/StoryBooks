const express = require("express");
const storiesController = require("../controllers/stories");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");
const router = express.Router();
//get all stories
router.get("/", storiesController.getStories);
//get add story
router.get("/add", ensureAuthenticated, storiesController.getAddStories);
//post add story
router.post("/add", ensureAuthenticated, storiesController.addStory);
//get a show story --one story--
router.get("/show/:id", storiesController.showStory);
//get edit story
router.get("/edit/:id", ensureAuthenticated, storiesController.getEditStroy);
//put edit story
router.put("/edit/:id", ensureAuthenticated, storiesController.editStory);
//delete story
router.delete(
  "/delete/:id",
  ensureAuthenticated,
  storiesController.deleteStory
);
//add comment
router.post("/comment/:id", ensureAuthenticated, storiesController.addComment);
// get stories from spacifc user
router.get("/user/:id", storiesController.getUserStories);
//get logged in user stories
router.get(
  "/my",
  ensureAuthenticated,
  storiesController.getLoggedinUserStories
);
module.exports = router;
