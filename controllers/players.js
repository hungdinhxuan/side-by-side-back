const Player = require('../models/Player')
const PAGE_SIZE = 50
const { linerImgLink, getRandomInt } = require('../config')
const Renter = require('../models/Renter')
const _ = require('underscore')
const multer = require('multer')
const { uploadMultiple } = require('./uploadImages')
const path = require('path')

class PlayerController {
  async uploadAlbumPhotos(req, res, next) {
    uploadMultiple(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err)

        return res
          .status(400)
          .json({
            success: false,
            err,
            message: 'File quá lớn !! Chỉ có thể tải lên tối đa 5MB mỗi lần',
          })
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err)
        return res
          .status(400)
          .json({
            success: false,
            err,
            message: 'Lỗi không xác định vui lòng thử lại sau',
          })
      }

      try {
        const pathFile = []
        for (let i = 0; i < req.files.length; i++) {
          pathFile.push(
            path.join(__dirname, `../public/images/${req.files[i].filename}`)
          )
          console.log( req.files[i])
        }
        console.log(pathFile)
        const player = await Player.updateOne(
          { renterId: req.user },
          { $push: { albums: pathFile } }
        )
        // console.log(req.files[0].filename)
        return res.json({
          success: true,
          message: 'Uploaded successfully',
          player,
        })
        //   Player.updateOne(
        //   { renterId: req.user },
        //   { $push: { albums: ["New York"] } },
        //   function(err, result) {
        //     if (err) {
        //       res.send(err)
        //     } else {
        //       res.send(result)
        //     }
        //   }
        // )
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: 'Internal Server Error' })
      }
    })
  }
  async get(req, res, next) {
    const { page, id } = req.query

    if (page) {
      let skip = (page - 1) * PAGE_SIZE
      try {
        let players = await Player.find({})
          .skip(skip)
          .limit(PAGE_SIZE)
          .populate('renterId', [
            'name',
            'gender',
            'city',
            'nation',
            'nickName',
          ])
        return res.json(players)
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: 'Internal Server Error' })
      }
    }
    if (id) {
      try {
        let player = await Player.findById(id)
        return res.json({ success: true, message: 'Player', player})
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: 'Internal Server Error' })
      }
    }
  }

  async post(req, res, next) {
    try {
      const player = await Player.create({
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        renterId: req.body.renterID,
      })
      return res.json({ success: true, message: `Created ${player}` })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error,
      })
    }
  }
  update(req, res, next) {}
  delete(req, res, next) {
    Player.deleteOne({ _id: req.id })
      .then((player) => {
        res.json({ success: `Deleted ${player}` })
      })
      .catch((err) => {
        res.status(500).json({ err })
      })
  }

  async destroy(req, res) {
    try {
      const player = await Player.remove({})
      return res.json({ success: true, message: 'Removed Player table' })
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
      const renter = await Renter.find({})

      console.log('had results')
      let index = 0
      let line
      const players = []
      const randomPrice = _.range(10000, 1010000, 10000)

      while ((line = linerImgLink.next())) {
        players.push({
          avatar: `https://drive.google.com/uc?export=view&id=${line.toString(
            'utf-8'
          )}`,
          firstName: renter[index].name.split(' ')[0],
          lastName: renter[index].name.split(' ')[1],
          price: randomPrice[Math.floor(Math.random() * randomPrice.length)],
          renterId: renter[index]._id,
        })
        index++
      }
      const player = await Player.insertMany(players)
      return res.json({
        success: true,
        message: 'Created sample player successful',
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

module.exports = new PlayerController()
