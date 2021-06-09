module.exports = (io) => {
  const listRentersOnline = []
  const listPlayersOnline = []
  const Player = require('./models/Player')
  const Renter = require('./models/Renter')

  io.on('connection', (socket) => {
    /* … */
    console.log(socket.id + 'connected')
    socket.on('disconnect', () => {
      console.log(socket.id + 'disconnected')
    })
    socket.on('validation', async (token) => {
      try {
        const decoded = await jwt.verify(token, publicKey)
        const { renterId } = decoded
        listRentersOnline.push({ renterId: socket.id })
        const player = await Player.findOne({ renterId })
        if (player) {
          const playerId = player._id
          const socketId = socket.id
          listPlayersOnline.push({ playerId: socketId })
        }
      } catch (error) {
        socket.emit('error', {
          success: false,
          message: 'Token is not valid',
          error: err,
        })
      }
    })
    
    socket.on('getListPlayers', () => {
        
    })

  })
}
