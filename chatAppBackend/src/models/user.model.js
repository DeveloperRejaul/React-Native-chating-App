const mongoose = require("mongoose");
const defaultPicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, required: true, default: defaultPicture },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
