const follows = require("../models/follows");

class FollowController {
  get(req, res, next) {
    if (Object.keys(req.query).length !== 0) {
      console.log(req.query);
      follows
        .findById(req.query.id)
        .then((follow) => {
          res.json(follow);
        })
        .catch((err) => {
          res.json(err);
        });
    }

    follows
      .find({})
      .then((follow) => {
        res.json(follow);
      })
      .catch((err) => {
        res.json({ error: "Server error" });
      });
  }
  post(req, res, next) {
    // follows.create({username: req.body.username, password: req.body.password, privateQuestion: req.body.privateQuestion, privateAnswer: req.body.privateAnswer})
    // .then(follow =>{
    //     res.json(`Created ${follow}`)
    // })
    // .catch(err =>{
    //     res.json(err)
    // })
  }
  update(req, res, next) {}
  delete(req, res, next) {
    follows
      .deleteOne({ _id: req.body.id })
      .then((follow) => {
        res.json({ success: `Deleted ${follow}` });
      })
      .catch((err) => {
        res.json({ error: "Server error" });
      });
  }
}

module.exports = new FollowController();
