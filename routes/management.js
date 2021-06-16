const express = require('express')
const router = express.Router()
const verify = require('../middleware/verify')
const {CreateRole} = require('../controllers/management')
const rentersController = require('../controllers/renters')

router.post('/role', CreateRole)
router.get('/renter', rentersController.FetchAll)

module.exports = router