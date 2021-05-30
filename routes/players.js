const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/players')
const verify = require('../middleware/verify')

// @route GET /api/player/create-sample
// @desc create sample players
// @access private
router.post('/create-sample', PlayerController.createSample)


// @route GET /api/player/destroy
// @desc destroy all Player
// @access private
router.delete('/destroy',  PlayerController.destroy)
router.get('/', PlayerController.get)

module.exports = router
