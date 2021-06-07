const Renter = require('../models/Renter')
const PAGE_SIZE = 50
const argon2 = require('argon2')
const WalletsController = require('./wallets')
const Wallet = require('../models/Wallet')
const {uploadSingle} = require('./uploadImages')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

class RenterController {
    uploadAvatar(req, res, next) {
    uploadSingle(req, res, async function (err) {
      var files
      try {
         files = await fs.readdirSync(__dirname)
         
      } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error})
      }
      
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err)
        
        return res.status(400).json({success: false, err, message: 'error1', files})
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err)
        return res.status(400).json({success: false, err, message: 'error2', files})
      }
   
      // Everything went fine.
      console.log(req.user)
      console.log(req.file)
      var renter
      try {
        renter = await Renter.findById(req.user)  
      } catch (error) {
        fs.futimesSync(req.file.path)
        return res.status(500).json({success: false, message: 'Internal Server Error'})
      }
      
      // Xóa thư mục cũ
      try {
        fs.unlinkSync(renter.avatar)
      } catch (error) {
        
      }

      // Update
      try {
        renter = await Renter.findByIdAndUpdate(req.user, {avatar:  path.join(__dirname, `../public/images/${req.file.filename}`)})
        return res.json({success: true, message: 'ok', path: path.join(__dirname, `../public/images/${req.file.filename}`)})
      } catch (error) {
        fs.futimesSync(req.file.path)
        return res.status(500).json({success: false, message: 'Internal Server Error'})
      }

    })
  }
  
  async get(req, res) {
    // const page = req.query.page

    // if (page) {
    //   let skip = (page - 1) * PAGE_SIZE
    //   try {
    //     let renter = await Renter.find({}).skip(skip).limit(PAGE_SIZE)
    //     return res.json(renter)
    //   } catch (error) {
    //     return res
    //       .status(500)
    //       .json({ success: false, message: 'Internal Server Error' })
    //   }
    // }
    try {
      const renter = await Renter.findById(req.user).select('-password')
      if (!renter) {
        return res
          .status(404)
          .json({ success: false, message: 'User is not exist or deleted' })
      }
      return res.json({ success: true, data: renter })
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error', error })
    }
  }

  async patch(req, res, next) {
    const { password, newPassword } = req.body
    if (!password || !newPassword) {
      return res
        .status(403)
        .json({ success: false, message: 'Mật khẩu không được để trống' })
    }
    console.log(password, newPassword)
    try {
      const renter = await Renter.findOne({ _id: req.user })
      if (!renter) {
        return res
          .status(403)
          .json({ success: false, message: 'Người dùng này không tồn tại' })
      }
      if (!(await argon2.verify(renter.password, password))) {
        return res
          .status(403)
          .json({ success: false, message: 'Mật khẩu không chính xác' })
      }
      const newRenter = await Renter.findByIdAndUpdate(
        { _id: req.user },
        { password: await argon2.hash(newPassword) }
      )
      return res.json({
        success: true,
        message: 'Mật khẩu đã được cập nhật thành công',
        newRenter,
      })
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error', error })
    }
  }

  async post(req, res) {
    let { username, email, password, name, gender } = req.body
    console.log(req.body)
    try {
      let renter = await Renter.findOne({ username })
      if (renter) {
        return res.status(406).json({
          success: false,
          message: 'Username is already existed',
        })
      }
      renter = await Renter.findOne({ email })
      console.log(renter)
      if (renter) {
        return res
          .status(406)
          .json({ success: false, message: 'Email is already existed' })
      }

      password = await argon2.hash(password)
      console.log('here' + password)
      let newRenter = await Renter.create({
        username,
        email,
        password,
        name,
        genders: gender,
      })
      WalletsController.post(newRenter._id)
      return res
        .status(201)
        .json({ success: true, message: 'Sign up successful !' })
    } catch (error) {
      return resWallet
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    }
  }

  async patchGeneral(req, res) {
    let { id, name, gender, birthDate, nickName, city, nation } = req.body

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Người dùng không hợp lệ !! ' })
    }
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: 'Bạn phải nhập vào họ và tên' })
    }
    gender = gender || 'Khác'
    nickName = nickName || ''
    city = city || 'Hồ Chí Minh'
    birthDate = birthDate || '01-01-2000'
    nation = nation || 'Việt Nam'

    console.log({ id, name, gender, birthDate, nickName, city, nation })
    try {
      const renter = await Renter.updateOne(
        { _id: id },
        { name, genders: gender, birthDate, nickName, city, nations: nation }
      )
      return res
        .status(206)
        .json({ success: true, message: 'Cập nhật thành công' })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Máy chủ gặp sự cố ! Vui lòng thử lại sau ít phút !',
      })
    }
  }

  async patchSecurity(req, res) {}

  put(req, res) {}
  delete(req, res, next) {
    Renter.deleteOne({ _id: req.id })
      .then((renter) => {
        res.json({ success: `Deleted ${renter}` })
      })
      .catch((err) => {
        res.status(500).json({ error: 'Server error' })
      })
  }
  async destroy(req, res) {
    try {
      const renter = await Renter.remove({})
      return res.json({ success: true, message: 'Removed Renter table' })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error,
      })
    }
  }

  async createSample(req, res) {
    try {
      const renters = []
      const wallets = []

      for (let i = 0; i < 9993; i++) {
        renters.push({
          username: `renter${i}`,
          password: await argon2.hash('zodiac'),
          email: `renter${i}@gmail.com`,
          name: `renter${i}`,
          genders: 'Nữ',
        })
      }
      console.log('ok')
      let renter = await Renter.insertMany(renters)

      for (let i = 0; i < renter.length; i++) {
        wallets.push({ renterId: renter[i]._id })
      }
      await Wallet.insertMany(wallets)
      // for(let i = 0; i < 1000; i++) {
      //   const renter = await Renter.create({
      //     username: `renter${i}_${results[i].login.username}`,
      //     password: 'zodiac',
      //     email:  Math.random().toString() +  results[i].email,
      //     name: results[i].name.first + ' ' + results[i].last,
      //     genders: results[i].gender
      //   })

      // }
      return res.json({
        success: true,
        message: 'Created sample renter successful',
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error,
      })
    }
  }
}

module.exports = new RenterController()
