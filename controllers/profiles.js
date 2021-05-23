const profiles = require("../models/Profile");

class ProfileController {
  get(req, res, next) {
    profiles
      .find({})
      .then((profile) => {
        res.json(profile);
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
    profiles
      .create({
        displayName: req.body.displayName,
        describe: req.body.describe,
        linkHightLight: req.body.linkHightLight,
        joinedAt: req.body.joinedAt,
        avatar: req.body.avatar,
      })
      .then((profile) => {
        res.json(`Created ${profile}`);
      })
      .catch((err) => {
        res.json(err);
      });
  }
  update(req, res, next) {}
  delete(req, res, next) {
    profiles
      .deleteOne({ _id: req.id })
      .then((profile) => {
        res.json({ success: `Deleted ${profile}` });
      })
      .catch((err) => {
        res.json({ error: "Server error" });
      });
  }
}

module.exports = new ProfileController();
