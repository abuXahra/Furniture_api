const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.MONGODB_PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

//database connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

app.listen(port, () => {
  connectDb();
  console.log(`server is running on port ${port}'`);
});
