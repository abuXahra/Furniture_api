const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  // create a user
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.MONGODB_SECRETE
      ).toString(),
    });

    try {
      await newUser.save();
      res.status(200).json({ message: "user created successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      // Check if user exists
      if (!user) {
        return res.status(401).json("Wrong credentials. Provide a valid email");
      }

      // Decrypt the password
      const decryptPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.MONGODB_SECRETE
      );

      const decryptPass = decryptPassword.toString(CryptoJS.enc.Utf8);

      // Check if password matches
      if (decryptPass !== req.body.password) {
        return res.status(401).json("Wrong password");
      }

      // Generate JWT token
      const userToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.MONGODB_JWT_SEC,
        { expiresIn: "7d" }
      );

      // Destructure to remove sensitive data
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

      // Send successful response
      return res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
      // Catch and handle errors
      return res.status(500).json({ message: error.message });
    }
  },

  // logout User
  logoutUser: async (req, res) => {
    // Implement logout logic (typically removing JWT token from client-side)
    res.status(200).json("Logged out successfully");
  },
};
