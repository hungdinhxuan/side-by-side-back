const Renter = require('../models/Renter')
const PAGE_SIZE = 50
const axios = require('axios')
const argon2 = require('argon2')

class RenterController {
  async get(req, res) {
    const page = req.query.page

    if (page) {
      let skip = (page - 1) * PAGE_SIZE
      try {
        let renter = await Renter.find({}).skip(skip).limit(PAGE_SIZE)
        return res.json(renter)
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: 'Internal Server Error' })
      }
    }
  }
  async post(req, res) {
    const { username, email, password, name, gender } = req.body
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
      let newRenter = await Renter.create({
        username,
        email,
        password: await argon2.hash(password),
        name,
        gender,
      })
      return res
        .status(201)
        .json({ success: true, message: 'Sign up successful !' })
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' })
    }
  }

  update(req, res, next) {}
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

      const renter = await Renter.insertMany(renters)
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

