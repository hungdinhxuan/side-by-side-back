const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')



router.get('/', renterController.get)
// router.post('/login', require('../controllers/login'))
router.post('/register', renterController.post)

module.exports = router