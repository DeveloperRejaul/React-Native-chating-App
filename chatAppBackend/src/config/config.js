const mongoose = require("mongoose");
require("dotenv").config();
const config = {
  appPort: process.env.PORT || 4000,
  dbConnect: async () => {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("databass connected");
    } catch (error) {
      console.log("databass connection error " + error.message);
    }
  },
};

module.exports = config;
