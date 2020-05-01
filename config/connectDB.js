const mongoose = require("mongoose");
const keys = require("./keys");

//Mongoose connect
module.exports = {
  connect: async function () {
    try {
      await mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (err) {
      console.log(err);
    }
  },
};
