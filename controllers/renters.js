const Renter = require('../models/Renter')
const PAGE_SIZE = 50
const axios = require('axios')
const argon2 = require('argon2')
const WalletsController = require('./wallets')
const Wallet = require('../models/Wallet')

class RenterController {
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
      if(!renter){
        return res.status(404).json({ success: false, message: 'User is not exist or deleted'})
      }
      return res.json({ success: true, data: renter})
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error', error})
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
      
      password =  await argon2.hash(password)
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
        .json({ success: true, message: 'Sign up successful !'})
    } catch (error) {
      return resWallet
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    }
  }

  async patchGeneral(req, res) {
    let {id, name, gender, birthDate , nickName, city, nation} = req.body
    
    if(!id ){
      return res.status(400).json({ success: false, message: 'Người dùng không hợp lệ !! ' })
    }
    if(!name){
      return res.status(400).json({ success: false, message: 'Bạn phải nhập vào họ và tên'})
    }
    gender = gender || 'Khác'
    nickName = nickName || ''
    city = city || 'Hồ Chí Minh'
    birthDate = birthDate || '01-01-2000'
    nation = nation || 'Việt Nam'

    console.log({id, name, gender, birthDate , nickName, city, nation})
    try {
      const renter = await Renter.updateOne({_id: id}, {name, genders: gender, birthDate, nickName, city, nations: nation})
      return res.status(206).json({ success: true, message: 'Cập nhật thành công'})
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Máy chủ gặp sự cố ! Vui lòng thử lại sau ít phút !' })
    }
  }

  async patchSecurity(req, res ){

  }

  put(req, res) {

  }
  delete(req, res, next) {
    Renter
      .deleteOne({ _id: req.id })
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
      return res.json({ success: true, message: 'Removed Renter table'})
    } catch (error) {
      return res.status(500).json({success: false, message: 'Internal Server Error', error: error})
    }
  }

  async createSample(req, res) {
    try {
      const users = await axios.get(
        'https://randomuser.me/api/?results=1000&gender=female'
      )
      const results = users.data.results
      const renters = []
      const wallets = []
      console.log('ok')
      for(let i = 0; i < 1000; i++){
        renters.push({
          username: `renter${i}_${results[i].login.username}`,
          password: await argon2.hash('zodiac'),
          email:  Math.random().toString() +  results[i].email,
          name: results[i].name.first + ' ' + results[i].last,
          genders: results[i].gender
        })
      }

      let renter = await Renter.insertMany(renters)
      
      for(let i = 0; i < renter.length; i++){
        wallets.push({renterId: renter[i]._id})
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
      return res.json({ success: true, message: 'Created sample renter successful' })
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal Server Error',
          error: error,
        })
    }
  }

}

module.exports = new RenterController()

