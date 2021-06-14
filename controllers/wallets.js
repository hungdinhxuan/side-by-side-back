const Wallet = require('../models/Wallet')
const Payment = require('../models/Payment')

exports.Deposit = async (req, res) => {
 const {paymentId, amount, walletId} = req.body
 try {
     const payment = await Payment.findById(paymentId)
     if(!payment){
        return res.status(403).json({success: false, message: 'Phương thức thanh toán không hợp lệ'})
     }
     else{
        let wallet = await Wallet.findById(walletId)
        if(!wallet){
            return res.status(403).json({success: false, message: 'Không thể tìm thấy ví này'})
        }else{
            wallet = await Wallet.findByIdAndUpdate(walletId, {balance: wallet.balance + amount})
            return res.json({success: true, message: 'Nạp tiền thành công'})
        }
     }
 } catch (error) {
     return res.status(500).json({success: false, message: 'Internal Server Error'})
 }  
}

exports.Widthdraw = (req, res ) => {

}