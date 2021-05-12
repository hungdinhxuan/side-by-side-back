const transacts = require("../models/Transact");

// renterID: {type: String, required: true},
//     playerID: {type: String, required: true},
//     amount: {type: Number},
//     rentedHours: {type: Number},
//     status: {type: String},
//     time: {type: Date},

class TransactController {
  get(req, res, next) {
    transacts
      .findOne({ _id: req.body.id })
      .then((transact) => {
        res.json(transact);
      })
      .catch((err) => {
        res.json({ err: 'Server error' })
      });
  }
  post(req, res, next) {
    transacts.create({
      renterID: req.body.renterID,
      playerID: req.body.playerID,
      amount: req.body.amount,
      rentedHours: req.body.rentedHours,
      status: req.body.status,
      time: req.body.time,
    })
    .then((transact)=>{
        res.json(`Created ${transact}`)
    } )
    .catch(err => {
        res.json({ err: 'Server error' })
    })
  }
  update(req, res, next) {}
  delete(req, res, next) {
    transacts
      .deleteOne({ _id: req.id })
      .then((transact) => {
        res.json({ success: `Deleted ${transact}` });
      })
      .catch((err) => {
        res.json({ error: "Server error" });
      });
  }
}

module.exports = new TransactController();
