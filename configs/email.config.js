const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'garciapascual.clara@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
})

module.exports = transporter;