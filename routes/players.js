const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players");
const verify = require("../verify");

const players = require("../models/players");
const renters = require("../models/renters");

/// create data test
router.get("/create", (req, res) => {
  renters
    .find({})
    .then((renter) => {
      let data = [];
      for (var i = 0; i < renter.length; i++) {
        players
          .create({
            avatar:
              "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
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
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.get('/destroy', playersController.destroy)
router.get('/', playersController.get)

module.exports = router;
