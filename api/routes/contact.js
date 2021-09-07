const { Router } = require('express');
const rateLimit = require('express-rate-limit');

const { sendNotificationEmail } = require('../utils/functions');

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
});

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
    await sendNotificationEmail(email, subject, message);
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

module.exports = router;
