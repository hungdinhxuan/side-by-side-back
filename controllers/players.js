const Player = require("../models/Player");
const PAGE_SIZE = 50;

class PlayerController {
  async get(req, res, next) {
    const page = req.query.page;

    if (page) {
      let skip = (page - 1) * PAGE_SIZE;
      try {
        let players = await Player.find({})
          .skip(skip)
          .limit(PAGE_SIZE)
          .populate('renterId', ['username'])
        res.json(players);
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    }
  }

  post(req, res, next) {
    Player.create({
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
    Player.deleteOne({ _id: req.id })
      .then((player) => {
        res.json({ success: `Deleted ${player}` });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
  destroy(req, res) {
    Player.remove({})
      .then((player) => {
        res.send("Removed Player table");
      })
      .catch((err) => {
        res.status(500).json({ error: "Server error" });
      });
  }
}

module.exports = new PlayerController();
