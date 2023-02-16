const db = require("../models");

// defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Book.find()
      .populate("requesters")
      .populate("owner")
      .populate("currentRenter")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Book.findById(req.params.id)
      .populate("requesters")
      .populate("owner")
      .populate("currentRenter")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Book.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log(req.body);
    db.Book.findByIdAndUpdate(
      req.params.id,
      { $push: { requesters: req.body.userId } },
      { new: true }
    )
      .populate("requesters")
      .populate("owner")
      .populate("currentRenter")
      .then((dbModel) => {
        // const requesters = dbModel
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book.findByIdAndRemove(req.params.id)
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
};