const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Book = require("../../models/book");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  User.find().then((users) => {
    console.log("You're here", users);
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  console.log("You're here", req.params.id);
  User.findById(req.params.id)
    .populate({path: "ownedBooks",  populate: {path:"requesters"} })
    .populate("renting")
    .then((user) => {
      console.log(user);
      res.json(user);
    });
});

router.post("/", async (req, res) => {
  try {
    console.log("You're here");
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("This Email is Already Registered");
    const newUser = new User({
      // name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      zipCode: req.body.zipCode,
      password: req.body.password,
    });
    // salt and hash password using bcrypt
    console.log(newUser);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    res.json(newUser);
  } catch (ex) {
    res.json(ex);
  }
});

router.put("/own/:id", async (req, res) => {
  try {
    console.log("You're here");
    let user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { ownedBooks: req.body.bookId } },
      { new: true }
    );
    console.log(user);
    res.json(user);
  } catch (ex) {
    res.json(ex);
  }
});
//saves the book to the suer
router.put("/added/:id", async (req, res) => {
  try {
    console.log(req.body);
    const savedBook = await Book.create({
      title: req.body.title,
      authors: req.body.authors,
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
      owner: req.params.id,
      currentRenter: null,
      requester: null,
    });
    // console.log(savedBook);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { ownedBooks: savedBook._id } },
      { new: true }
    );
    res.json(updatedUser);
    // res.json(savedBook);
  } catch (ex) {
    res.json(ex);
  }
});

router.put("/rent/:id", async (req, res) => {
  try {
    console.log("Made it here");
    // console.log(req.query);
    let user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { renting: req.body.bookId } },
      { new: true }
    );
    // console.log(user);
    res.json(user);
  } catch (ex) {
    res.json(ex);
  }
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id).then((user) => {
    res.json(user);
  });
});

module.exports = router;