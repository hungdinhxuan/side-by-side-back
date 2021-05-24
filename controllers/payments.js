const payments = require('../models/Payment')

class PaymentController {
  get(req, res, next) {
    payments
      .find({})
      .then((payment) => {
        res.json(payment)
      })
      .catch((err) => {
        res.json({ err })
      })
  }
//   name: {type: String},
//   cardNumber: {type: String},
//   releaseDate: {type: String},
//   paymentId: {type: String},
  post(req, res, next) {
    payments
      .create({
        name: req.body.name,
        cardNumber: req.body.cardNumber,
        releaseDate: req.body.releaseDate,
        paymentId: req.body.paymentId,
      })
      .then((payment) => {
        res.json({sucess:`Created ${payment}`})
      })
      .catch((err) => {
        res.json(err)
      })
  }
  update(req, res, next) {}
  delete(req, res, next) {
    payments
      .deleteOne({ _id: req.id })
      .then((payment) => {
        res.json({ success: `Deleted ${payment}` })
      })
      .catch((err) => {
        res.json({ error: 'Server error' })
      })
  }
}

module.exports = new PaymentController()
