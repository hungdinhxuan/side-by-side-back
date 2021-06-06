const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profiles')

router.get('/', profileController.get)
router.post('/create-sample', profileController.createSample)

module.exports = router