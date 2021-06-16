const Role = require('../models/Role')
const Renter = require('../models/Renter')
const Player = require('../models/Player')

exports.CreateRole = async (req, res) => {
    const {level, name, permission } = req.body
    try {
        const role = await Role.create({level, name})
        return res.json({success: true, message: 'Created new role'})
    } catch (error) {
        return res.json({success: false, message: 'Internal server Error'})   
    }
}


exports.ViewRole = async(req, res) => {
    try {
        const roles = await Role.find({})   
        return res.json({success: true, roles})
    } catch (error) {
        return res.json({success: false, message: 'Internal server Error'})   
    }
}

exports.UpdateRole = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.DeleteRole = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.DestroyRole = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}











