const { Router } = require('express');
const fs = require('fs');
const { join } = require('path');
const dayjs = require('dayjs');
// const axios = require('axios');

const router = Router();

router.get('/status', (req, res) => {
  const currentStatus = fs.readFileSync(join(__dirname + '/../storage/status.json'), 'utf8');
  const allStatuses = fs.readFileSync(join(__dirname + '/../storage/statuses.json'), 'utf8');

  const statuses = JSON.parse(allStatuses);
  const status = JSON.parse(currentStatus);
  const currentTime = dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]');

  if (
    dayjs(status.lastUpdated.replace(' AM', ''))
      .add(1, 'minutes').isBefore(currentTime)
    && status.status !== 0
  ) {
    const data = JSON.stringify({ status: 0, lastUpdated: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z] A') }, null, 4);
    fs.writeFileSync(join(__dirname + '/../storage/status.json'), data, 'utf8');
  } else if (status.status === 0) {
    console.log('offline already, no need to update');
  } else {
    console.log('I am online.')
  }

  res.json({
    ...statuses[status.status],
    lastUpdated: status.lastUpdated,
  });
});

router.post('/status', (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).json({
      message: 'Unauthenticated: Missing authorization header'
    });
  }
  if (authorization !== process.env.STATUS_PASSWORD) {
    return res.status(403).json({
      message: 'Unauthenticated: Invalid authorization code'
    });
  }

  const status = req.body.status;

  if (status === undefined) {
    return res.status(422).json({
      message: 'Error: Missing required Body',
    });
  } else if (status > 3 || status < 0) {
    return res.status(422).json({
      message: 'Error: Status is too high or too low',
    });
  }

  try {
    const data = JSON.stringify({ status, lastUpdated: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z] A') }, null, 4);
    fs.writeFileSync(join(__dirname + '/../storage/status.json'), data, 'utf8');
    res.json({
      message: 'Success, successfully updated status',
    });
  } catch (err) {
    console.log(`Error writing file: ${err}`);
    res.status(500).json({
      message: 'Error: Was unable to update status.',
    });
  }

});

module.exports = router;
