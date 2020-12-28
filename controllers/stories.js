const Story = require("../models/story");

module.exports = {
  getStories: async function (req, res, next) {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ date: "desc" });
    if (stories) {
      res.render("stories/index", {
        stories: stories,
      });
    }
  },
  getAddStories: async function (req, res, next) {
    res.render("stories/add");
  },
  addStory: async function (req, res, next) {
    let allowComments;
    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }
    const newStory = {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      allowComments: allowComments,
      user: req.user,
    };

    //create story
    const story = await new Story(newStory).save();
    if (story) {
      res.redirect(`/stories/show/${story._id}`);
    }
  },
  showStory: async function (req, res, next) {
    const storyId = req.params.id;
    const story = await Story.findById(storyId)
      .populate("user")
      .populate("comments.commentUser");
    if (story) {
      if (story.status == "public") {
        res.render("stories/show", {
          story: story,
        });
      } else {
        if (req.user) {
          if (story.user._id == req.user.id) {
            res.render("stories/show", {
              story: story,
            });
          } else {
            res.redirect("/stories");
          }
        } else {
          res.redirect("/stories");
        }
      }
    }
  },
  getEditStroy: async function (req, res, next) {
    const storyId = req.params.id;
    const story = await Story.findById(storyId);
    if (story) {
      if (story.user != req.user.id) {
        res.redirect("/stories");
      } else {
        res.render("stories/edit", {
          story: story,
        });
      }
    }
  },
  editStory: async function (req, res, next) {
    const storyId = req.params.id;
    const story = await Story.findById(storyId);
    if (story) {
      let allowComments;
      if (req.body.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }
      story.title = req.body.title;
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = allowComments;
      const updatedStory = await story.save();
      if (updatedStory) {
        res.redirect("/dashboard");
      }
    }
  },
  deleteStory: async function (req, res, next) {
    const storyId = req.params.id;
    await Story.deleteOne({ _id: storyId });
    res.redirect("/dashboard");
  },

  addComment: async function (req, res, next) {
    const storyId = req.params.id;
    const story = await Story.findOne({ _id: storyId });
    if (story) {
      const newComment = {
        commentBody: req.body.commentBody,
        commentUser: req.user.id,
      };
      //push add to the end
      //we use unshift
      story.comments.unshift(newComment);
      await story.save();
      res.redirect(`/stories/show/${storyId}`);
    }
  },
  getUserStories: async function (req, res, next) {
    const userId = req.params.id;
    const stories = await Story.find({
      user: userId,
      status: "public",
    }).populate("user");
    if (stories) {
      res.render("stories/index", {
        stories: stories,
      });
    }
  },
  //get logged in user stories
  getLoggedinUserStories: async function (req, res, next) {
    const userId = req.user.id;
    const stories = await Story.find({ user: userId }).populate("user");
    if (stories) {
      res.render("stories/index", {
        stories: stories,
      });
    }
  },
};
