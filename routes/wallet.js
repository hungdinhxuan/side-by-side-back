const express = require('express')
const router = express.Router()
const {FetchInfo, Deposit} = require('../controllers/wallets')


router.get('/', (req, res) => {
    console.log(getListCity)
    return res.json({success: true, cities: getListCity, })
})

module.exports = router