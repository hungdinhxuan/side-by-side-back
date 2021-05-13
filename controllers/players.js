const players = require("../models/Player");
const PAGE_SIZE = 50

class PlayerController {
  get(req, res, next) {
    const page = req.query.page;

    if(page)
    {
      let skip = (page - 1) * PAGE_SIZE
      players
      .find({})
      .populate('renters', ['username'])
      .skip(skip)
      .limit(PAGE_SIZE)
      .then((player) => {
        res.json(player);
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
    }
  }
 
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
      .then((player) => {
        res.send("Removed players table");
      })
      .catch((err) => {
        res.status(500).json({ error: "Server error" });
      });
  }
}

module.exports = new PlayerController();
