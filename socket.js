module.exports = (io) => {
  const Player = require('./models/Player')
  const Renter = require('./models/Renter')
  const { publicKey } = require('./config')
  const jwt = require('jsonwebtoken')
  const socketioJwt = require('socketio-jwt')
  const activateUser = new Set()
  const activateSocketId = new Set()

  io.on('connection', (socket) => {
    
    socket.on('authenticate', function (data) {
      // check data được send tới client
      jwt.verify(data.token, publicKey, function (err, decoded) {
        if (!err && decoded) {
          const {renterId} = decoded
          socket.User = renterId
          activateUser.add(renterId)
          activateSocketId.add(socket.id)
          console.log('Authenticated socket ', socket.User)
          
        }
      })
    })

    socket.on('disconnect', async () => {
      console.log('user disconnected')
      activateSocketId.delete(socket.id)
      activateUser.delete(socket.User)
    })

    socket.on('RENT_REQUEST', async (data) => {
      const {receiver, message} = data
      /// Gui lai cho nguoi gui thong diep thanh cong
      socket.emit('SENDER_NOTIFICATION', {response: 'Gui thanh cong'})
      /// Get socketId
      const socketId = [...activateSocketId][[...activateUser].indexOf(receiver)]
      console.log(activateUser)
      console.log(activateSocketId)
      io.to(socketId).emit('RECEIVER_NOTIFICATION', {response: `${socket.id} sent : ${message} to ${receiver}`})
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

        io.sockets.emit('GET_USERS', {
          response: activePlayer.concat(inactivePlayer),
        })
      } catch (error) {
        console.log(error)
        return
      }
    })
  })
}
