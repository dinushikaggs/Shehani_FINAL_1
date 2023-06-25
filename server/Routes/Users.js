const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const {
  logIn,
  register,
  sendEmail,
  resetPassword,
  forgotPassword,
  changePassword,
} = require("../controllers/Users.controller");

router.get("/", async (req, res) => {
  try {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { mobile_no } = req.body;

    // Check if the mobile number already exists
    const existingUser = await Users.findOne({ where: { mobile_no } });
    if (existingUser) {
      return res.status(400).json({ error: "Mobile no already exists" });
    }

    const post = req.body;
    await Users.create(post);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update(updatedUser);

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to remove user" });
  }
});

// Additional routes from the second file
router.post("/login", logIn);
router.post("/register", register);
router.post("/sendEmail", sendEmail);
router.post("/reset/:id/:token", resetPassword);
router.post("/forgotPass/:email", forgotPassword);
router.post("/changePassword/:id", changePassword);

module.exports = router;
