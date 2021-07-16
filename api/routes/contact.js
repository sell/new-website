const { Router } = require('express');
const nodeMailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
});

const mailTransport = nodeMailer.createTransport(`smtps://${process.env.EMAIL_USERNAME}%40gmail.com:${process.env.EMAIL_PASSWORD}@smtp.gmail.com`);

/*
  todo: Add redis to cache requests and limit user from abusing (cache emails - encrypted, cache ips - encrypted)
  todo: Add rate limits in redis to not store in memory locally
 */

const router = Router();

router.post('/contact', limiter, async(req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(409).json({
      error: 'Missing Required Body',
    });
    return;
  }
  try {
    const data = await sendNotificationEmail(email, subject, message);
    console.log(data);
    res.json({
      submitted: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      submitted: false,
    });
  }
});

function sendNotificationEmail(email, subject, text) {
  const mailOptions = {
    from: `"Personal Website" <${email}>`,
    to: process.env.EMAIL_MAIN,
    subject: `Website - ${subject}`,
    text,
  };
  return new Promise((resolve, reject) => mailTransport.sendMail(mailOptions).then(() => {
    console.log('New star email notification sent to: ' + email);
    resolve('New star email notification sent to: ' + email);
  }).catch((e) => {
    console.log(e);
    reject(new Error('An error happened'));
  }));
}

module.exports = router;
