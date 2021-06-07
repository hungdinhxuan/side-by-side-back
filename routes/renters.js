const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')
const verify = require('../middleware/verify')


router.get('/', verify, renterController.get)

router.post('/upload-avatar', renterController.uploadAvatar)

router.patch('/general', verify, renterController.patchGeneral)

// @route POST /api/renter/create-sample
// @desc create sample renters
// @access public
router.post('/create-sample', renterController.createSample)


// @route DELETE /api/renter/destroy
// @desc destroy all Renter
// @access public
router.delete('/destroy', renterController.destroy)

module.exports = router