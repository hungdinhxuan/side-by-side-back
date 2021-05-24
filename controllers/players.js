const Player = require('../models/Player');
const PAGE_SIZE = 50;
const axios = require('axios');
const { linerImgLink, getRandomInt } = require('../config');
const Renter = require('../models/Renter');


class PlayerController {
  async get(req, res, next) {
    const page = req.query.page;

    if (page) {
      let skip = (page - 1) * PAGE_SIZE;
      try {
        let players = await Player.find({})
          .skip(skip)
          .limit(PAGE_SIZE)
          .populate('renterId', ['username']);
        return res.json(players);
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: 'Internal Server Error' });
      }
    }
  }

  async post(req, res, next) {
    try {
      const player = await Player.create({
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
        nation: req.body.nation,
        renterId: req.body.renterID,
      });
      return res.json({ success: true, message: `Created ${player}` });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal Server Error',
          error: error,
        });
    }
  }
  update(req, res, next) {}
  delete(req, res, next) {
    Player.deleteOne({ _id: req.id })
      .then((player) => {
        res.json({ success: `Deleted ${player}` });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }

  async destroy(req, res) {
    try {
      const player = await Player.remove({});
      return res.json({ success: true, message: 'Removed Player table' });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal Server Error',
          error: error,
        });
    }
  }
  async createSample(req, res) {
    try {
      const renter = await Renter.find({});
      const users = await axios.get(
        'https://randomuser.me/api/?results=1000&gender=female'
      );
      
      const results = users.data.results;
      console.log('had results')
      let index = 0;
      let line;
      while ((line = linerImgLink.next())) {
        const player = await Player.create({
          avatar: line.toString('utf-8'),
          firstName: results[index].name.first,
          lastName: results[index].name.last,
          city: results[index].location.city,
          nation: results[index].location.country,
          price: Math.floor(Math.random() * (10000000 - 10000) + 10000),
          renterId: renter[index]._id,
        });
        index++;
      }
      return res.json({ success: true, message: 'Created sample player successful' });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal Server Error',
          error: error,
        });
    }
  }
}

module.exports = new PlayerController();
