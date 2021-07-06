const path = require('path')
const fs = require('fs')
const lineByLine = require('n-readlines')
const privateKey = fs.readFileSync(path.join(__dirname, '/keys/privateKey.pem'))
const publicKey = fs.readFileSync(path.join(__dirname, '/keys/publicKey.pem'))
const linerImgLink = new lineByLine(path.join(__dirname, 'link.txt'))
const destination = path.resolve(__dirname, 'public/images')

require('dotenv').config()
// const DB_USERNAME="admin"
// const DB_PASSWORD="admin"
// const DB_NAME="SideBySide"
// const  GOOGLE_CLIENT_ID="549866172650-o632qga06fhb7bodb723dm4mmnb252g5.apps.googleusercontent.com"
// const  GOOGLE_CLIENT_SECRET="6ejLJkexWQwpXcN2N9XMJTyJ"
// const  FACEBOOK_CLIENT_ID="1707966096067858"
// const  FACEBOOK_CLIENT_SECRET="8f67fb5c398f86a6b3b40b2d8825ab56"
// const  ADMIN_EMAIL="analystchessgame@gmail.com"
// const  ADMIN_EMAIL_PASSWORD = "c86c039dab9fced9bcc65825b07dd4f51dcd75c33b001d2eca2324fbd820021a"
// const  MAIL_HOST="smtp.gmail.com"
// const  MAIL_PORT=587
// const  JWT_ACTIVATE="aduvip"
const frontendHost = 'http://localhost:3000'
const atlasDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rrcyu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const localDB = 'mongodb://localhost:27017/SideBySideDB'
const getListCity = ['An Giang',
'Bà Rịa Vũng Tàu',
'Bình Dương',
'Bình Phước',
'Bình Thuận',
'Bình Định',
'Bạc Liêu',
'Bắc Cạn',
'Bắc Giang',
'Bắc Ninh',
'Bến Tre',
'Cao Bằng',
'Cà Mau',
'Cần Thơ',
'Đà Nẵng',
'Đăk Lăk',
'Điện Biên',
'Đồng Nai',
'Đồng Tháp',
'Gia Lai',
'Hà Giang',
'Hà Nam',
'Hà Nội',
'Hà Tây',
'Hà Tĩnh',
'Hà Đông',
'Hòa Bình',
'Hưng Yên',
'Hạ Long',
'Hải Dương',
'Hải Phòng',
'Hồ Chí Minh',
'Khánh Hòa',
'Kiên Giang',
'KonTum',
'Lai Châu',
'Long An',
'Lào Cai',
'Lâm Đồng',
'Lạng Sơn',
'Nam Định',
'Nghệ An',
'Ninh Bình',
'Ninh Thuận',
'Phú Thọ',
'Phú Yên',
'Quảng Bình',
'Quảng Nam',
'Quảng Ngãi',
'Quảng Ninh',
'Quảng Trị',
'Sóc Trăng',
'Sơn La',
'Thanh Hóa',
'Thái Bình',
'Thái Nguyên',
'Thừa Thiên Huế',
'Tiền Giang',
'Trà Vinh',
'Tuyên Quang',
'Tây Ninh',
'Vĩnh Long',
'Vĩnh Phúc',
'Yên Bái',
'Khác']

const a = 4

module.exports = {
  privateKey,
  publicKey,
  frontendHost,
  atlasDB,
  localDB,
  linerImgLink,
  getListCity,
  destination
}
