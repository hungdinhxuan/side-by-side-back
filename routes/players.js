const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players");
const verify = require("../verify");

const players = require("../models/players");
const renters = require("../models/renters");

const axios = require("axios");

/// create data test
router.get("/create", (req, res) => {
  renters
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
                  renterId: renter[i].id,
                })
                .then((player) => {
                  data.push(player);
                })
                .catch((err) => {
                  res.status(500).json({ err });
                });
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }

      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.get("/destroy", playersController.destroy);
router.get("/", playersController.get);

module.exports = router;
