const histories = require("../models/histories");

class HistoryController {
  get(req, res, next) {
    histories
      .find({})
      .then((history) => {
        res.json(history);
      })
      .catch((err) => {
        res.json({ err });
      });
  }
//   historiesId: {type: String, required: true},
//   ammount: {type: Number, required: true, default: 0},
//   time: {type: Date, required: true},
//   methods: {type: String}
  post(req, res, next) {
    histories
      .create({
        historiesId: req.body.historiesId,
        ammount: req.body.ammount,
        time: req.body.time,
        methods: req.body.methods,
      })
      .then((history) => {
        res.json(`Created ${history}`);
      })
      .catch((err) => {
        res.json(err);
      });
  }
  update(req, res, next) {}
  delete(req, res, next) {
    histories
      .deleteOne({ _id: req.id })
      .then((histories) => {
        res.json({ success: `Deleted ${histories}` });
      })
      .catch((err) => {
        res.json({ error: "Server error" });
      });
  }
}

module.exports = new HistoryController();
