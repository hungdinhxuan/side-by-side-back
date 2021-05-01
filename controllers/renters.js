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
        renters.create({username: req.body.username, password: req.body.password, privateQuestion: req.body.privateQuestion, privateAnswer: req.body.privateAnswer})
        .then(renter =>{
            res.json(`Created ${renter}`)
        })
        .catch(err =>{
            res.json(err)
        })
        
    }
    update(req, res, next){
        
    }
    delete(req, res, next){
        renters.deleteOne({_id: req.id})
        .then(renter =>{res.json({success: `Deleted ${renter}`})})
        .catch(err=>{
            res.json({error: 'Server error'})
        })
    }
}

module.exports = new RenterController