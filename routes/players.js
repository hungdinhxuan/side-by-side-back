const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players");
const verify = require("../middleware/verify");

const players = require("../models/Player");
const Renter = require("../models/Renter");

const axios = require("axios");

// @route GET /api/player/create
// @desc create sample players
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
              players
                .create({
                  avatar:response.data[j % 50].download_url,
                  firstName: "",
                  lastName: "",
                  sex: "unknown",
                  city: "Ho Chi Minh",
                  nation: "Viet Nam",
                  price: 50000,
                  renterId: renter[i]._id,
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

      return res.json({success: true, message: 'Created players'});
    })
    .catch((err) => {
      return res.status(500).json({ success: false, message: 'Internal Server Error'});
    });
});

// @route GET /api/player/destroy
// @desc destroy all players
// @access private
router.get("/destroy",  playersController.destroy);
router.get("/", playersController.get);

module.exports = router;
