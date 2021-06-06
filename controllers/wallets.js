const Wallet = require('../models/Wallet')

class WalletController {
  get(req, res, next) {
    Wallet
      .find({})
      .then((wallet) => {
        res.json(wallet)
      })
      .catch((err) => {
        res.json({ err })
      })
  }
//   renterId : {type: String, required: true},
//   Balance : {type: Number, default: 0},
  async post(renterId) {
    try {
      await Wallet.create({renterId})
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error'})
    }
  }
  update(req, res, next) {}
  delete(req, res, next) {
    Wallet
      .deleteOne({ _id: req.id })
      .then((wallet) => {
        res.json({ success: `Deleted ${wallet}` })
      })
      .catch((err) => {
        res.json({ error: 'Server error' })
      })
  }
}

module.exports = new WalletController()
