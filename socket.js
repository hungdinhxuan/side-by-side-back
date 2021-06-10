module.exports = (io) => {
  const listRentersOnline = []
  const listPlayersOnline = []
  const Player = require('./models/Player')
  const Renter = require('./models/Renter')
  const { publicKey } = require('./config')
  const jwt = require('jsonwebtoken')

  io.on('connection', (socket) => {
    /* … */
    // console.log(socket.id + 'connected')
    socket.on('disconnect', () => {
      // console.log(socket.id + 'disconnected')
      for(let i = 0; i < listPlayersOnline.length; i++) {
        for(let key in listPlayersOnline[i]){
          if (listPlayersOnline[i][key] === socket.id){
            listPlayersOnline.splice(i, 1)
          }
        }
      }
    })
    socket.on('validate', async (token) => {
      try {
        const decoded = jwt.verify(token, publicKey)

        const { renterId } = decoded
        let obj = {}
        obj[renterId] = socket.id
        listRentersOnline.push(obj)

        const player = await Player.findOne({ renterId })

        if (player) {
          const listPlayersOnlineId = listPlayersOnline.map(
            (value) => Object.keys(value)[0]
          )
          /// Nếu mà player chưa có trong danh sách online

          if (!(player._id in listPlayersOnlineId)) {
            obj = {}

            obj[player._id] = socket.id

            listPlayersOnline.push(obj)
          } /// Nếu mà player có trong danh sách online nhưng mà kết nối ở socket khác thì cập nhật lại socket
          else {
            listPlayersOnline.forEach((value, index) => {
              Object.keys(value).map((key) => {
                if (key === player.id && socket.id != value[key]) {
                  listPlayersOnline[index][key] = socket.id
                }
              })
            })
          }
          let playersOnl = []
          let playersOffline = []
          try {
            const listPlayersOnlineId = listPlayersOnline
              .map((value) => Object.keys(value).map((key) => key))
              .map((value) => value[0])

            playersOnl = await Player.find({
              _id: { $in: listPlayersOnlineId },
            }).limit(50).lean()
          } catch (error) {
            playersOnl = []
          }
          try {
            const listPlayersOnlineId = listPlayersOnline
              .map((value) => Object.keys(value).map((key) => key))
              .map((value) => value[0])
            const playersOffline = await Player.find({
              _id: { $nin: listPlayersOnlineId },
            }).limit(50 - listPlayersOnlineId.length).lean()
            playersOnl.forEach(
              (value, index) => playersOnl[index].status = 'online'
            )
            
            playersOffline.forEach(
              (value, index) => playersOffline[index].status = 'offline'
            )
            const listPlayers = playersOnl.concat(playersOffline)
            
            io.sockets.emit('showPlayers', {
              success: true,
              response: listPlayers,
            })
          } catch (error) {
            playersOffline = []
          }
        }
      } catch (error) {
        socket.emit('error', {
          success: false,
          response: 'Token is not valid',
          error: error,
        })
      }
    })

    socket.on('getListPlayers', async () => {
      let playersOnl = []
      let playersOffline = []
      try {
        const listPlayersOnlineId = listPlayersOnline
          .map((value) => Object.keys(value).map((key) => key))
          .map((value) => value[0])

        playersOnl = await Player.find({
          _id: { $in: listPlayersOnlineId },
        }).limit(50).lean()
      } catch (error) {
        playersOnl = []
      }
      try {
        const listPlayersOnlineId = listPlayersOnline
          .map((value) => Object.keys(value).map((key) => key))
          .map((value) => value[0])
        const playersOffline = await Player.find({
          _id: { $nin: listPlayersOnlineId },
        }).limit(50 - listPlayersOnlineId.length).lean()

        playersOnl.forEach(
          (value, index) => playersOnl[index].status = 'online'
        )

        playersOffline.forEach(
          (value, index) => playersOffline[index].status = 'offline'
        )
        const listPlayers = playersOnl.concat(playersOffline)
        

        io.sockets.emit('showPlayers', {
          success: true,
          response: listPlayers,
        })
      } catch (error) {
        playersOffline = []
      }
    })
  })
}
