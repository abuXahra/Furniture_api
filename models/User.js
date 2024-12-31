const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    imgUrl: { type: String, require: true },
    description: { type: String, require: true },
    location: { type: String, default: "Shangai China" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
