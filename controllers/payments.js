const Payment = require('../models/Payment')
const Wallet = require('../models/Wallet')

exports.CreateSamples = async (req, res, next) => {
  try {
    const wallets = await Wallet.find({})
    const payments = []
    const cardsNumbers = []
    let i = 0
    while(i < wallets.length) {
      let cardNumber = Math.floor(Math.random() * 10000000000000000)
      if(!(cardNumber in cardsNumbers))
      {
        cardsNumbers.push(cardNumber)
        i++
      }
    }
    for (let i = 0; i < wallets.length; i++) {
      payments.push({
        name: 'VISA',
        cardNumber: cardsNumbers[i],
        releaseDate: '02/02/2021',
        expiresDate: '02/02/2040',
        walletId: wallets[i]._id,
      })
    }
    
    const payment = await Payment.insertMany(payments)
    return res.status(201).json({success: true, message: 'Created sample payment successfully!!', payment})    
  } catch (error) {
    return res
      .status(500)
      .join({ success: false, message: 'Internal Server Error' })
  }
}

exports.Create = async (req, res, next) => {
  const {name, cardNumber, releaseDate, expiresDate, walletId} = req.data
  try {
    const payment = await Payment.create({name, cardNumber, releaseDate, expiresDate, walletId})
    return res.json({success: true, message: 'Created method payment successfully!!'})    
  } catch (error) {
    return res
      .status(500)
      .join({ success: false, message: 'Internal Server Error' })
  }
}
