const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')
const verify = require('../middleware/verify')
const renters = require('../models/Renter')

router.get('/', verify, renterController.get)

// @route /api/renter/create-sample
// @ method: GET
// @ access: public
router.post('/create-sample', renterController.createSample)


router.delete('/destroy', renterController.destroy)

module.exports = router