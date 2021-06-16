const express = require('express')
const router = express.Router()
const verify = require('../middleware/verify')
const { CreateRole } = require('../controllers/management')
const rentersController = require('../controllers/renters')
const playersController = require('../controllers/players')

// Role management
router.post('/role', CreateRole)

// Renter management
router.get('/renter', rentersController.FetchAll)
router.patch('/renter/:id', rentersController.delete)
router.delete('/renter/:id/force', rentersController.forceDelete)
router.patch('/renter/:id/restore', rentersController.Restore)


/// Player management
router.patch('/player/:id', playersController.delete)
router.delete('/player/:id/force', playersController.forceDelete)
router.patch('/player/:id/restore', playersController.Restore)

module.exports = router
