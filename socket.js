module.exports = (io) => {
  const Player = require('./models/Player')
  const Renter = require('./models/Renter')
  const { publicKey } = require('./config')
  const jwt = require('jsonwebtoken')

  const activateUser = new Set()
  const activateSocketId = new Set()

  io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
      jwt.verify(socket.handshake.query.token, publicKey, function(err, decoded) {
        if (err) return next(new Error('Authentication error'))
        const { renterId } = decoded
        activateUser.add(renterId)
        activateSocketId.add(socket.id)
        socket.User = renterId
        console.log('ok')
        next()
      })
    }
    else {
      next(new Error('Authentication error'));
    }    
  }).on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log('user disconnected')
      activateSocketId.delete(socket.id)
      activateUser.delete(socket.User)
      console.log([...activateUser], [...activateSocketId])
    })

    socket.on('GET_USERS', async () => {
      try {
        const activePlayer = await Player.find({
          renterId: { $in: [...activateUser] },
        })
          .limit(50)
          .lean()
        const inactivePlayer = await Player.find({
          renterId: { $nin: [...activateUser] },
        })
          .limit(50 - activePlayer.length)
          .lean()

        activePlayer.forEach(
          (value, index) => (activePlayer[index].status = 'active')
        )
        inactivePlayer.forEach(
          (value, index) => (inactivePlayer[index].status = 'inactive')
        )

        socket.emit('GET_USERS', {
          response: activePlayer.concat(inactivePlayer),
        })
      } catch (error) {
        console.log(error)
        return
      }
    })

  })
}
