const express = require('express')
const router = express.Router()
const {FetchInfo, Deposit} = require('../controllers/wallets')
const verify = require('../middleware/verify')

router.get('/', verify, FetchInfo)
router.patch('/', verify, Deposit)

module.exports = router