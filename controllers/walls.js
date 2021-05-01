const walls = require("../models/walls");

class WallController {
  get(req, res, next) {
    walls
      .find({})
      .then((wall) => {
        res.json(wall);
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
//   displayName: {type: String},
//   describe: {type: String},
//   linkHightLight: {type: String},
//   joinedAt: {type: Date},
//   avatar: {type: String},
  post(req, res, next) {
    walls
      .create({
        displayName: req.body.displayName,
        describe: req.body.describe,
        linkHightLight: req.body.linkHightLight,
        joinedAt: req.body.joinedAt,
        avatar: req.body.avatar,
      })
      .then((wall) => {
        res.json(`Created ${wall}`);
      })
      .catch((err) => {
        res.json(err);
      });
  }
  update(req, res, next) {}
  delete(req, res, next) {
    walls
      .deleteOne({ _id: req.id })
      .then((wall) => {
        res.json({ success: `Deleted ${wall}` });
      })
      .catch((err) => {
        res.json({ error: "Server error" });
      });
  }
}

module.exports = new wallController();
