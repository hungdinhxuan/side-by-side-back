const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')
const path = require('path')
const verify = require('../verify')

router.get('/', verify, renterController.get)
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../loginTest.html'))
})
router.post('/login', require('../controllers/login'))
router.post('/register', renterController.post)

module.exports = router