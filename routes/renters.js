const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')
const path = require('path')
const verify = require('../middleware/verify')
const renters = require('../models/Renter')

router.get('/', verify, renterController.get)
router.post('/login', require('../controllers/login'))
router.post('/register', renterController.post)
router.get('/create', async (req, res) =>{
    
    for(var i = 0; i < 500; i++){
        try {
            const renter = await renters.create({username: `renter${i}`, password: 'renter'})   
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal server error', error})
        }
    }
    return res.json({success: true, message: `Created successfully`})
})

router.get('/destroy', renterController.destroy)

module.exports = router