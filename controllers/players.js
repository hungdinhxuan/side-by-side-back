const players = require("../models/players");

class PlayerController {
  get(req, res, next) {
    players
      .find({})
      .then((player) => {
        res.json(player);
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
  // avatar: {type: String},
  // firstname: {type: String},
  // lastname: {type: String},
  // sex: {type: String},
  // city: {type: String},
  // nation: {type: String},
  // price: {type: Number},
  // renterId: {type: String}
  post(req, res, next) {
    players
      .create({
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        sex: req.body.sex,
        city: req.body.city,
        nation: req.body.nation,
        renterId: req.body.renterID,
      })
      .then((player) => {
        res.json(`Created ${player}`);
      })
      .catch((err) => {
        res.json(err);
      });
  }
  update(req, res, next) {}
  delete(req, res, next) {
    players
      .deleteOne({ _id: req.id })
      .then((player) => {
        res.json({ success: `Deleted ${player}` });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
  destroy(req, res) {
    players
      .remove({})
      .then((renter) => {
        res.send("Removed renters table");
      })
      .catch((err) => {
        res.status(500).json({ error: "Server error" });
      });
  }
}

module.exports = new PlayerController();
