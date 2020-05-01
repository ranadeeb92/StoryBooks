const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");
const User = require("../models/user");

module.exports = async function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async function (accessToken, refreshToken, profile, done) {
        // console.log(accessToken);
        //console.log(profile);
        const newUser = {
          googleID: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        // check if the user is already exist
        const user = await User.findOne({ googleID: profile.id });
        if (user) {
          console.log("this user is already added to db");
          done(null, user);
        } else {
          try {
            new User(newUser);
            await newUser.save();
            done(null, newUser);
          } catch (err) {
            console.log(err);
          }
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
};
