const express = require("express");
const router = express.Router();
const PlayerController = require("../controllers/players");
const verify = require("../middleware/verify");
const axios = require("axios");


// router.get('/create2', async (req, res) => {
//   let line
//   try {
//     const renter = await Renter.find({})  
//     for (let i = 0; i < renter.length ; i++) {
//         line = liner.next()
//         const player = await Player.create({
//           avatar:line.toString('utf-8'),
//                   firstName: "",
//                   lastName: "",
//                   sex: "unknown",
//                   city: "Ho Chi Minh",
//                   nation: "Viet Nam",
//                   price: 50000 + Math.floor(Math.random() * 100000),
//                   renterId: renter[i]._id,
//         })
//         console.log(player)
//     }
//     return res.json({success: true, message: 'Created Player'});
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Internal Server Error'});
//   }
  
// })

// @route GET /api/player/destroy
// @desc destroy all Player
// @access private
router.get("/destroy",  PlayerController.destroy);
router.get("/", PlayerController.get);

module.exports = router;
