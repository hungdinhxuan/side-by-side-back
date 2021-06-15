const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/players')
const verify = require('../middleware/verify')

// @route POST /api/player/create-sample
// @desc create sample players
// @access private
router.post('/create-sample', PlayerController.createSample)


// @route DELETE /api/player/destroy
// @desc destroy all Player
// @access private
router.delete('/destroy',  PlayerController.destroy)

// @route GET /api/player
// @desc get all Player
// @access public
router.get('/', PlayerController.get)



// @route GET /api/player/upload-albums
// @desc get all Player
// @access private
// router.post('/upload-albums', verify, PlayerController.uploadAlbumPhotos)

module.exports = router
