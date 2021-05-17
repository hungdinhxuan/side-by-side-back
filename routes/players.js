const express = require("express");
const router = express.Router();
const PlayerController = require("../controllers/players");
const verify = require("../middleware/verify");

const Player = require("../models/Player");
const Renter = require("../models/Renter");

const axios = require("axios");
const lineByLine = require('n-readlines')
const liner = new lineByLine('./imglink.txt')


// @route GET /api/player/create
// @desc create sample Player
// @access private
router.get("/create",  (req, res) => {
  Renter
    .find({})
    .then((renter) => {
      let data = [];
      for (let i = 0; i < renter.length / 50; i++) {
        axios
          .get(`https://picsum.photos/v2/list?page=${i}&limit=50`)
          .then(function (response) {
            console.log(response);
            for (let j = i * 50; j < i * 50 + 50; j++) {
              Player
                .create({
                  avatar:response.data[j % 50].download_url,
                  firstName: "",
                  lastName: "",
                  sex: "unknown",
                  city: "Ho Chi Minh",
                  nation: "Viet Nam",
                  price: 50000,
                  renterId: renter[j]._id,
                })
                .then((player) => {
                  data.push(player);
                })
                .catch((err) => {
                  return res.status(500).json({ success: false, message: err});
                });
            }
          })
          .catch(function (error) {
            // handle error
            return res.status(500).json({ success: false, message: 'Internal Server Error'});
          });
      }

      return res.json({success: true, message: 'Created Player'});
    })
    .catch((err) => {
      return res.status(500).json({ success: false, message: 'Internal Server Error'});
    });
});

router.get('/create2', async (req, res) => {
  let line
  try {
    const renter = await Renter.find({})  
    for (let i = 0; i < renter.length ; i++) {
        line = liner.next()
        const player = await Player.create({
          avatar:line.toString('utf-8'),
                  firstName: "",
                  lastName: "",
                  sex: "unknown",
                  city: "Ho Chi Minh",
                  nation: "Viet Nam",
                  price: 50000 + Math.floor(Math.random() * 100000),
                  renterId: renter[i]._id,
        })
        console.log(player)
    }
    return res.json({success: true, message: 'Created Player'});
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error'});
  }
  
})

// @route GET /api/player/destroy
// @desc destroy all Player
// @access private
router.get("/destroy",  PlayerController.destroy);
router.get("/", PlayerController.get);

module.exports = router;
