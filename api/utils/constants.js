const nodeMailer = require('nodemailer');

module.exports = Object.freeze({
  MAIL_TRANSPORT: nodeMailer.createTransport(
    `smtps://${process.env.EMAIL_USERNAME}%40gmail.com:${process.env.EMAIL_PASSWORD}@smtp.gmail.com`,
  ),
});
