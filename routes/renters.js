const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')
const verify = require('../middleware/verify')
const renters = require('../models/Renter')

router.get('/', verify, renterController.get)

// @route POST /api/renter/create-sample
// @desc create sample renters
// @access public
router.post('/create-sample', renterController.createSample)


// @route DELETE /api/renter/destroy
// @desc destroy all Renter
// @access public
router.delete('/destroy', renterController.destroy)

module.exports = router