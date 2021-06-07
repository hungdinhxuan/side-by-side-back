const express = require('express')
const router = express.Router()
const renterController = require('../controllers/renters')
const verify = require('../middleware/verify')
const Renter = require('../models/Renter')
const {uploadSingle} = require('../controllers/uploadImages')

router.get('/all', async (req, res) =>{
    try {
        return res.json({renters: await Renter.find({})})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error'})       
    }
})

router.get('/:username', async (req, res) =>{
    const {username} = req.params
    try {
        const renter = await Renter.findOne({_id: username})
        return res.json({success: true, message: 'ok', renter})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal Server Error'})       
    }
})


router.get('/', verify, renterController.get)

router.post('/upload-avatar', verify,  renterController.uploadAvatar)

router.patch('/general', verify, renterController.patchGeneral)

// @route POST /api/renter/create-sample
// @desc create sample renters
// @access public
router.post('/create-sample', renterController.createSample)


// @route DELETE /api/renter/destroy
// @desc destroy all Renter
// @access public
router.delete('/destroy', renterController.destroy)

module.exports = router