const Wallet = require('../models/Wallet')
const Payment = require('../models/Payment')
const assert = require('assert')

exports.Deposit = async (req, res) => {
  const { paymentId, amount } = req.body
  try {
    const payment = await Payment.findById(paymentId)
    if (!payment) {
      return res
        .status(403)
        .json({
          success: false,
          message: 'Phương thức thanh toán không hợp lệ',
        })
    } 
        let wallet = await Wallet.findOne({renterId: req.user})
        const newBalance = parseInt(wallet.balance) + parseInt(amount)
       wallet = await Wallet.findOneAndUpdate({renterId: req.user}, {balance: newBalance})

      console.log( newBalance)
      return res.json({ success: true, message: 'Nạp tiền thành công',  newBalance: newBalance.balance})
    
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
}

exports.FetchInfo = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ renterId: req.user })
    return res.json({ success: true, wallet })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
}

exports.CreateWallet = async (renterId) => {
  try {
    const wallet = await Wallet.create({renterId, balance: 10000000})

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
}

exports.Widthdraw = (req, res) => {}


exports.Transact = async (senderId, receiverId, money) => {
  try {
    let senderWallet = await Wallet.findOne({renterId: senderId})
    let receiverWallet = await Wallet.findOne({renterId: receiverId})
  
    if(parseInt(senderWallet.balance) < parseInt(money)){
      console.log(senderWallet.balance )
      return false
    }else{
      const newSenderBalance = parseInt(senderWallet.balance) - parseInt(money)
      const newReceiverBalance = parseInt(receiverWallet.balance) + parseInt(money)
      // assert(newSenderBalance !== null)
      // assert(newReceiverBalance !== null)
      senderWallet = await Wallet.findOneAndUpdate({renterId: senderId}, {balance: newSenderBalance})
      receiverWallet = await Wallet.findOneAndUpdate({renterId: receiverId}, {balance: newReceiverBalance})
      // console.log(senderWallet)
      console.log(newSenderBalance)
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
