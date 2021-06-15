const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profiles')
const verify = require('../middleware/verify')

router.get('/', profileController.get)
router.post('/create-sample', profileController.createSample)

// @route GET /api/player/upload-albums
// @desc get all Player
// @access private
router.patch('/upload-albums', verify, profileController.uploadAlbumPhotos)

module.exports = router