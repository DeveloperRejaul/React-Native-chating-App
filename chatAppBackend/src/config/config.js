const mongoose = require("mongoose");
require("dotenv").config();
const config = {
  appPort: process.env.PORT || 4000,
  dbConnect: async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/ChattingApp");
      console.log("databass connected");
    } catch (error) {
      console.log("databass connection error " + error.message);
    }
  },
};

module.exports = config;
