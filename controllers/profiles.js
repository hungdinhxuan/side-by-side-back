const Profile = require('../models/Profile')
const Player = require('../models/Player')

class ProfileController {
  async get(req, res, next) {
    const {id} = req.query
    if(id) {
      const profile = await Profile.findOne({playerId: id}).populate('playerId', ['price', 'renterId'])
      if(profile) {
        return res.json({success: true, message: 'OK',profile})
      }
      return res.status(404).json({success: true, message: 'Profile not found'})
    }
    else{
      return  res.status(500).json({success: false, message: 'Internal Server Error'})
    }
  }

  async createSample(req, res) {
    try {
      const players = await Player.find({})
      const profiles = []
      
    for(let i = 0; i < players.length; i++){
      profiles.push({displayName: `${players[i].firstName} ${players[i].lastName}`,
                  shortDescribe: 'Số 1 thế giới ❤️ LoL, NA, KR Tốc Chiến, LQM, PubgPC-MB, COD, Among US, Business Tour, Valorant, free Fire, BNS, Deceit, dota2, autochess',
                  detailDescribe: 'Ea commodo irure id pariatur magna culpa. Duis pariatur nostrud nisi tempor non ullamco veniam cupidatat pariatur dolor. Laborum anim magna adipisicing duis aliquip. Laborum officia ullamco cupidatat voluptate. Consequat et incididunt sunt veniam tempor qui cillum id minim nulla. \nNostrud consequat cillum et est laborum esse pariatur aliqua sunt officia. Dolore occaecat aliquip proident tempor eiusmod quis commodo aliquip pariatur non sit. Mollit in mollit ipsum enim aliqua consectetur dolore cupidatat quis magna Lorem exercitation incididunt veniam.\nSit exercitation exercitation veniam Lorem.\nOfficia Lorem eiusmod ea anim consectetur elit irure voluptate nostrud sint laborum aliquip quis.\nSit ut cupidatat excepteur eu.\nFugiat nisi commodo enim culpa aute excepteur pariatur elit minim dolor.\nNostrud ex nisi consequat pariatur sit incididunt exercitation.\nUt aute enim consectetur qui.',
                  linkHightLight: 'https://www.youtube.com/watch?v=ukNZsidFngs',
                  avatar: players[i].avatar,
                  linkSocial: 'https://www.facebook.com/anky.us',
                  availableDevices: 'Microphone',
                  playerId: players[i]._id
      })
    }  
    console.log(profiles)
    await Profile.insertMany(profiles)
    return res.json({success: true, message: 'Create profile sample successfully !!'})
    } catch (error) {
      return  res.status(500).json({success: false, message: 'Internal Server Error', error: error})
    }
    
    
  }
//   displayName: {type: String},
//   describe: {type: String},
//   linkHightLight: {type: String},
//   joinedAt: {type: Date},
//   avatar: {type: String},
  post(req, res, next) {
    Profile
      .create({
        displayName: req.body.displayName,
        describe: req.body.describe,
        linkHightLight: req.body.linkHightLight,
        joinedAt: req.body.joinedAt,
        avatar: req.body.avatar,
      })
      .then((profile) => {
        res.json(`Created ${profile}`)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  async update(req, res, next) {
    let {profileId, displayName, shortDescribe, detailDescribe, linkHightLight, avatar, linkSocial, availableDevices} = req.body
    displayName = displayName || 'NULL'
    shortDescribe = shortDescribe ||  ''
    detailDescribe = detailDescribe || ''
    linkHightLight = linkHightLight || ''
    avatar = avatar || ''
    linkSocial = linkSocial || ''
    availableDevices = availableDevices || 'None'
    try {
      const profile = await Profile.findByIdAndUpdate(profileId, {displayName, shortDescribe, detailDescribe, linkHightLight, avatar, linkSocial, availableDevices})
      return res.json({success : true, message: 'Đã cập nhật thành công'})
    } catch (error) {
      return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
  }

  async destroy(req, res) {
    try {
      const renter = await Renter.remove({})
      return res.json({ success: true, message: 'Removed Renter table' })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error,
      })
    }
  }
  delete(req, res, next) {
    Profile
      .deleteOne({ _id: req.id })
      .then((profile) => {
        res.json({ success: `Deleted ${profile}` })
      })
      .catch((err) => {
        res.json({ error: 'Server error' })
      })
  }
}

module.exports = new ProfileController()
