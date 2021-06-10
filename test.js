function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
  }

  // "src": "/(.*)",
            // "dest": "/"
const {publicKey} = require('./config')
const jwt = require('jsonwebtoken')

const test = async () =>{
  console.log(await jwt.verify('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZW50ZXJJZCI6IjYwYmRkYjNjMTA5ZThjMjc3NDk2NmRjZiIsImlhdCI6MTYyMzI0OTE0MX0.zc9g7hZEFlkGnsE8USeuDGw_Y0eSDapuxb59XMoPobXY8pSJ3rZopOjhGds8Mpho332CF9Ik3S7-jQA2zabems5r1DgtEBCe3wPWY02vS61nTSwhFsaJo6WgLKLC52EQTdIfZpvGbniqieXNE8nWq3w5O4TDXtGSLFjUiow41tERBFJFTb5OPFLPZzz7WfNCWxTZPBknlqMuwN3KcTtrNvOFCfycTSnlNO4Z9PtzuuiEG5_ydY522u2I8aoApJmAvYAfIVO3zehTCoNhkUwv3aAwe5TtO5AyaPie9FdMAX5_n8PAPpn0CyuxWQC20WNBdZl0PYDauisq890yoN5jEA', publicKey))
}
test()
  