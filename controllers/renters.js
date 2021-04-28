const renters = require('../models/renters')

class RenterController
{
    get(req, res, next){
        renters.find({})
        .then(renter =>{
            res.json(renter)
        })
        .catch(err =>{
            res.status(500).json({err})
        })
    }
    post(req, res, next){

    }
    update(req, res, next){

    }
    delete(req, res, next){

    }
}

module.exports = new RenterController