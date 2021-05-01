const express = require('express')
const router = express.Router()
const followController = require('../controllers/follows')



router.get('/', followController.get)
router.delete('/', followController.delete)

module.exports = router