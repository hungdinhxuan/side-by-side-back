const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')
const path = require('path')
const verify = require('../verify')
const renters = require('../models/renters')

router.get('/', verify, renterController.get)
router.post('/login', require('../controllers/login'))
router.post('/register', renterController.post)
router.get('/create', (req, res) =>{
    
    for(var i = 0; i < 50; i++){
        renters.create({username: `renter${i}`, password: 'renter'})
        .then(renter => {})
        .catch(err => {res.status(500).json({err})})
    }
    res.json('Create successful')
})

router.get('/destroy', renterController.destroy)

module.exports = router