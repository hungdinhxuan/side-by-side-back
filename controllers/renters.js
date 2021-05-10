const renters = require("../models/Renter");

class RenterController {
  get(req, res, next) {
    renters
      .find({})
      .then((renter) => {
        res.json(renter);
      })
      .catch((err) => {
        res.status(406).json({ err });
      });
  }
  post(req, res, next) {
    renters
      .create({
        username: req.body.username,
        password: req.body.password,
        privateQuestion: req.body.privateQuestion,
        privateAnswer: req.body.privateAnswer,
      })
      .then((renter) => {
        res.status(201).json("Created");
      })
      .catch((err) => {
        res.status(406).json("User is existed");
      });
  }
  update(req, res, next) {}
  delete(req, res, next) {
    renters
      .deleteOne({ _id: req.id })
      .then((renter) => {
        res.json({ success: `Deleted ${renter}` });
      })
      .catch((err) => {
        res.status(500).json({ error: "Server error" });
      });
  }
  destroy(req, res) {
    renters
      .remove({})
      .then((renter) => {
        res.send("Removed renters table");
      })
      .catch((err) => {
        res.status(500).json({ error: "Server error" });
      });
  }
}

module.exports = new RenterController();
