const express = require("express");
const postUser = require("../models/newUser");
const router = express.Router();

//R - READ /    (GET):
router.get("/", (req, res) => {
  res.send("Welcome to the API");
  console.log("Welcome to the API!");
});

//C - CREATE /users   (POST):
router.post("/users", async (req, res) => {
  try {
    const user = new postUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const savedUser = await user.save();
    res.json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//R - READ /users   (GET):
router.get("/users", async (req, res) => {
  try {
    const users = await postUser.find();
    res.json(users);
    console.log(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//U - UPDATE /users/:userId   (PATCH):
router.patch("/users/:userId", async (req, res) => {
  try {
    const updatedUser = await postUser.updateOne(
      { _id: req.params.userId },
      { $set: { firstName: req.body.firstName } }
    );
    res.json(updatedUser);
    console.log(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//D - DELETE /users/:userId   (DELETE):
router.delete("/users/:userId", async (req, res) => {
  try {
    const removedUser = await postUser.remove({ _id: req.params.userId });
    res.json(removedUser);
    console.log(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//EXPORT ROUTER:
module.exports = router;
