const express = require('express')
const router = express.Router()
const {CreateSamples, Create} = require('../controllers/payments')


router.post('/create-sample', CreateSamples)
router.post('/', Create)

module.exports = router