const { MAIL_TRANSPORT: mailTransport } = require('../utils/constants');

function sendNotificationEmail(email, subject, text) {
  const mailOptions = {
    from: `"Personal Website" <${email}>`,
    to: process.env.EMAIL_MAIN,
    subject: `Website - ${subject}`,
    text,
  };
  return new Promise((resolve, reject) =>
    mailTransport
      .sendMail(mailOptions)
      .then(() => {
        console.log('Email notification sent to: ' + email);
        resolve('Email notification sent to: ' + email);
      })
      .catch((e) => {
        console.log(e);
        reject(new Error('An error happened'));
      }),
  );
}

module.exports = { sendNotificationEmail };
