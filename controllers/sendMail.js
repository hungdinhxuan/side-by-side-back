const nodeMailer = require('nodemailer')
require('dotenv').config()
const { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD, MAIL_HOST, MAIL_PORT } = process.env

const sendMail = (to, subject, htmlContent) => {
  // Khởi tạo một thằng transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
  const transporter = nodeMailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_EMAIL_PASSWORD,
    },
  })
  const options = {
    from: ADMIN_EMAIL, // địa chỉ admin email bạn dùng để gửi
    to: to, // địa chỉ gửi đến
    subject: subject, // Tiêu đề của mail
    html: htmlContent, // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  }
  // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
  return transporter.sendMail(options)
}

module.exports = sendMail
