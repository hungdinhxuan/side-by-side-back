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
          .populate("renterId", ["username"]);
        return res.json(players);
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    }
  }

  async post(req, res, next) {
    try {
      const player = await Player.create({
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        sex: req.body.sex,
        city: req.body.city,
        nation: req.body.nation,
        renterId: req.body.renterID,
      });
      return res.json({success: true, message: `Created ${player}`})
    } catch (error) {
      return res.status(500).json({success: false, message: 'Internal Server Error', error: error})
    }
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

  async destroy(req, res) {
    try {
      const player = await Player.remove({})
      return res.json({ success: true, message: 'Removed Player table'})
    } catch (error) {
      return res.status(500).json({success: false, message: 'Internal Server Error', error: error})
    }
    
  }
}

module.exports = new PlayerController();
