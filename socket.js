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
  const rentings = new Set()

  io.on('connection', (socket) => {

    /// Kiem tra neu het han thi xoa
    // for(let value of rentings){
    //   if(new Date(value.time).getTime() - new Date().getTime() < 0){
    //     rentings.delete(value)
    //   }
    // }
    
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
      // socket.removeAllListeners()
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
        let canSend = true
        for(let value of rentings){
          // console.log(value)
          // console.log()
          // console.log(receiver, Object.values(value))
          if(Object.values(value).includes(receiver)){
            canSend = false
            break
          }
        }
        if(canSend){

          const renter = await Renter.findById(socket.User)
          socket.emit('SENDER_NOTIFICATION', { response: 'Gui thanh cong' })
          const socketIdReceiver = [...activateSocketId][
            [...activateUser].indexOf(receiver)
          ]
          console.log(socketIdReceiver)
          io.to(socketIdReceiver).emit('RECEIVER_NOTIFICATION', {
            response: `${renter.name} muốn thuê bạn chơi cùng trong vòng ${time} với giá là ${cost}`,
            sender: socket.User,
            time, 
            price: cost
          })

        }else{
          socket.emit('SENDER_NOTIFICATION', { response: 'Player này hiện tại đang được thuê !!!' })
        }
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
      console.log(time, price)
      const d = new Date()
      if([...rentings].length === 0) {
        rentings.add({renter: sender, player: socket.User, time: new Date( d.setTime(d.getTime() + 1000 * 60 * 60 * time.split(' ')[0] )), price: price, room: `${sender}--with--${socket.User}`})
      }
      for(let value of rentings){
        console.log(value)
        /// Nếu mà player đó chưa được thuê thì thêm vào rentings
        if(!Object.values(value).includes(socket.User)){
          rentings.add({renter: sender, player: socket.User, time: new Date( d.setTime(d.getTime() + 1000 * 60 * 60 * time.split(' ')[0] )), price: price, room: `${sender}--with--${socket.User}`})
        }
      }
      
      /// Nếu mà player xác nhận thuê thì buộc cả 2 phải JOIN ROOM
      /// Gửi cho renter id của player
      io.to(socketIdSender).emit('CONFIRM_RENT_REQUEST', {
        room: sender + '--with--' + socket.User,
      })
      /// Gửi cho player id của renter
      io.to(socket.id).emit('CONFIRM_RENT_REQUEST', {
        room: sender + '--with--' + socket.User,
      })
    })

    socket.on('RENTING', () => {
      socket.emit('RENTING', [...rentings])
    })

    /// Láy thông tin của giao dich thuê hiện tại cho người dùng trong room
    socket.on('GET_ROOM_INFO', (roomId) => {
     

      for(let value of rentings){
        if(Object.values(value).includes(roomId) && Object.values(value).includes(socket.User)){
          socket.emit('GET_ROOM_INFO', value)
        }
      }
    })
   
    

    socket.on('JOIN_ROOM', (roomName) => {
      
      console.log(socket.adapter.rooms)
      console.log(rentings)


      Array.from(socket.rooms)
        .filter((it) => it !== socket.id)
        .forEach((id) => {
          socket.leave(id)
          socket.removeAllListeners('EMIT_MESSEGES')
        })

      socket.join(roomName)

      socket.on('EMIT_MESSEGES', (message) => {
        Array.from(socket.rooms)
          .filter((it) => it !== socket.id)
          .forEach((id) => {
            socket.to(id).emit('ON_MESSEGES', message)
          })
          // socket.to(updatedRoomName).emit('ON_MESSEGES', message)
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
