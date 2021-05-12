const wallets = require("../models/Wallet");

class WalletController {
  get(req, res, next) {
    wallets
      .find({})
      .then((wallet) => {
        res.json(wallet);
      })
      .catch((err) => {
        res.json({ err });
      });
  }
//   renterId : {type: String, required: true},
//   Balance : {type: Number, default: 0},
  post(req, res, next) {
    wallets
      .create({
        renterId: req.body.renterId,
        balance: req.body.balance,
      })
      .then((wallet) => {
        res.json(`Created ${wallet}`);
      })
      .catch((err) => {
        res.json(err);
      });
  }
  update(req, res, next) {}
  delete(req, res, next) {
    wallets
      .deleteOne({ _id: req.id })
      .then((wallet) => {
        res.json({ success: `Deleted ${wallet}` });
      })
      .catch((err) => {
        res.json({ error: "Server error" });
      });
  }
}

module.exports = new WalletController();
