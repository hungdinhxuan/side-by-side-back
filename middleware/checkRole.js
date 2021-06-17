const Renter = require('../models/Renter')

module.exports = async (req, res, next) => {
    try {
        const renter = await Renter.findById(req.user)
        if(renter.role < 1) {
            return res.status(403).json({success: false, message: 'Bạn không có quyền truy cập vào trang này'})
        }else{
            req.role = renter.role
            next()
        }
    } catch (error) {
        return res.status(500).json({success: false, message: 'Lỗi không xác định vui lòng thử lại sau'})
    }
}