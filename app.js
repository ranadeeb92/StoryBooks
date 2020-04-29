const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
