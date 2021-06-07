const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  },
})

const maxSize = 1 * 1024 * 1024 // for 1MB

var upload = multer({
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
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log('eer1')
      return res.send(err)
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log('eer')
      return res.send(err)
    }

    // Everything went fine.
    console.log(req.file)
    return res.json({ success: true , message: 'File uploaded successfully'})
  })
})

module.exports = router
