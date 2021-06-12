const OrderDetail = require('../models/OrderDetail')


exports.post = async (data) => {
  const {amount, rentedHours, status, renterId, playerId} = data
  try {
    const orderDetail = await OrderDetail.create({amount, rentedHours, status, renterId, playerId})
    return orderDetail
  } catch (error) {
    return null
  }
}


exports.patchStatus = async (data) => {
  const {_id, status} = data
  try {
    const orderDetail = await OrderDetail.findByIdAndUpdate(_id, {status})
    return orderDetail
  } catch (error) {
    return null
  }
}