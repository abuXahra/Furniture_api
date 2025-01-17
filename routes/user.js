const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);

router.get("/", userController.getUsers);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUsers);

module.exports = router;
