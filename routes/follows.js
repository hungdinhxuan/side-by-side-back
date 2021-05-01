const express = require('express')
const router = express.Router()
const followController = require('../controllers/follows')
const verify = require('../verify')


router.get('/', verify, followController.get)
router.delete('/', followController.delete)

module.exports = router