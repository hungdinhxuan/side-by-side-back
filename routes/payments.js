const express = require('express')
const router = express.Router()
const {CreateSamples, Create, FetchInfo} = require('../controllers/payments')
const verify = require('../middleware/verify')

router.post('/create-sample', CreateSamples)
router.post('/', verify, Create)
router.get('/', verify, FetchInfo)

module.exports = router