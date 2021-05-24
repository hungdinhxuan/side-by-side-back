const orderDetails = require('../models/OrderDetail');

// renterID: {type: String, required: true},
//     playerID: {type: String, required: true},
//     amount: {type: Number},
//     rentedHours: {type: Number},
//     status: {type: String},
//     time: {type: Date},

class OrderDetailController {
  get(req, res, next) {
    orderDetails
      .findOne({ _id: req.body.id })
      .then((orderDetail) => {
        res.json(orderDetail);
      })
      .catch((err) => {
        res.json({ err: 'Server error' })
      });
  }
  post(req, res, next) {
    orderDetails.create({
      renterID: req.body.renterID,
      playerID: req.body.playerID,
      amount: req.body.amount,
      rentedHours: req.body.rentedHours,
      status: req.body.status,
      time: req.body.time,
    })
    .then((orderDetail)=>{
        res.json(`Created ${orderDetail}`)
    } )
    .catch(err => {
        res.json({ err: 'Server error' })
    })
  }
  update(req, res, next) {}
  delete(req, res, next) {
    orderDetails
      .deleteOne({ _id: req.id })
      .then((orderDetail) => {
        res.json({ success: `Deleted ${orderDetail}` });
      })
      .catch((err) => {
        res.json({ error: 'Server error' });
      });
  }
}

module.exports = new OrderDetailController();
