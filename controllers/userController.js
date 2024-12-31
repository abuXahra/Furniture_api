const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  // get a user
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(401).json("User does not exist");
      }

      const { passport, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: "Fail to get user" });
    }
  },

  // get all users
  getUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Fail to get users" });
    }
  },

  // update a user
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.MONGODB_SECRETE
          ).toString(),
          imgUrl: req.body.imgUrl,
          description: req.body.description,
          location: req.body.location,
        },
        { new: true } // This returns the updated document
      );

      if (!updatedUser) {
        return res.status(404).json("User not found");
      }

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json("Fail to update the User");
    }
  },

  // delete a user
  deleteUsers: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
