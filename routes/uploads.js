const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})
const maxSize = 1 * 1024 * 1024
const uploadSingle = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
  limits: { fileSize: maxSize },
}).single('image')

router.post('/single', (req, res, next) => {
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    
      return res.status(413).json({success: false, message: 'Ảnh quá lớn, kích thước ảnh phải <= 500KB'})
    } else if (err) {
      // An unknown error occurred when uploading.

      return res.status(415).json({success: false, message: 'Chỉ định dạng ảnh  là .png, .jpg và .jpeg được cho phép '})
    }

    // Everything went fine.
    console.log(req.file)
    
    return res.json({ success: true, message: 'Ảnh của bạn đã được tải lên thành công' })
  })
})

module.exports = router
