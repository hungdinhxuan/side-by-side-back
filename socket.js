module.exports = (io) => {
  const Player = require('./models/Player')
  const Renter = require('./models/Renter')
  const { publicKey } = require('./config')
  const jwt = require('jsonwebtoken')
  const socketioJwt = require('socketio-jwt')
  const activateUser = new Set()
  const activateSocketId = new Set()
  const {
    getNotification,
    createNotification,
  } = require('./controllers/notifications')

  const messeges = []
  io.on('connection', (socket) => {
    socket.on('authenticate', function (data) {
      // check data được send tới client
      jwt.verify(data.token, publicKey, function (err, decoded) {
        if (!err && decoded) {
          const { renterId } = decoded
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
      socket.removeAllListeners()
    })

    socket.on('EMIT_AVATAR', async () => {
      try {
        console.log('EMIT_AVATAR')
        const renter = await Renter.findById(socket.User)
        const player = await Player.findOne({renterId: socket.User})
        if(player){
          socket.emit('ON_AVATAR', player.avatar)
        }else{
          socket.emit('ON_AVATAR', renter.avatar)
        }
      } catch (error) {
        
      }
    })

    socket.on('RENT_REQUEST', async (data) => {
      const { receiver, message, time, cost } = data
      /// Gui lai cho nguoi gui thong diep thanh cong

      /// Get socketId

      try {
        const renter = await Renter.findById(socket.User)
        socket.emit('SENDER_NOTIFICATION', { response: 'Gui thanh cong' })
        const socketIdReceiver = [...activateSocketId][
          [...activateUser].indexOf(receiver)
        ]
        io.to(socketIdReceiver).emit('RECEIVER_NOTIFICATION', {
          response: `${renter.name} muốn thuê bạn chơi cùng trong vòng ${time} với giá là ${cost}`,
          sender: socket.User,
        })
      } catch (error) {
        socket.emit('SENDER_NOTIFICATION', {
          response: 'Gui thất bại ~~ player này không sẵn sàng',
        })
      }
      // if(createNotification({renterId: receiver, content: `${socket.User} muốn thuê bạn chơi cùng`}))
    })

    // Player cofirm
    socket.on('CONFIRM_RENT_REQUEST', async (data) => {
      const { sender, time, price } = data
      const socketIdSender = [...activateSocketId][
        [...activateUser].indexOf(sender)
      ]

      /// Nếu mà player xác nhận thuê thì buộc cả 2 phải JOIN ROOM
      /// Gửi cho renter id của player
      io.to(socketIdSender).emit('CONFIRM_RENT_REQUEST', {
        room: socket.User+ '--with--' + sender,
      })
      /// Gửi cho player id của renter
      io.to(socket.id).emit('CONFIRM_RENT_REQUEST', {
        room: sender + '--with--' + socket.User,
      })
    })


    socket.on('JOIN_ROOM', (roomName) => {
      let split = roomName.split('--with--') // ['username2', 'username1']

      let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)) // ['username1', 'username2']

      let updatedRoomName = `${unique[0]}--with--${unique[1]}` // 'username1--with--username2'
      console.log(socket.adapter.rooms)
      Array.from(socket.rooms)
        .filter((it) => it !== socket.id)
        .forEach((id) => {
          socket.leave(id)
          socket.removeAllListeners('EMIT_MESSEGES')
        })

      socket.join(updatedRoomName)

      socket.on('EMIT_MESSEGES', (message) => {
        // Array.from(socket.rooms)
        //   .filter((it) => it !== socket.id)
        //   .forEach((id) => {
        //     socket.to(id).emit('ON_MESSEGES', message)
        //   })
          socket.to(updatedRoomName).emit('ON_MESSEGES', message)
      })
    })

    // socket.on('MESSEGES', async (data) => {
    //   io.sockets.in(socket.ROOM).emit('MESSEGES', data)
    // })

    socket.on('HISTORY_MESSEGE', async (data) => {})

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
