const fs = require('fs');
const { join } = require('path');
const { Router } = require('express');
const dayjs = require('dayjs');
const { auth } = require('../middlewares/authorization');

const router = Router();

router.get('/status', (req, res) => {
  const currentStatus = fs.readFileSync(
    join(__dirname + '/../storage/status.json'),
    'utf8',
  );
  const allStatuses = fs.readFileSync(
    join(__dirname + '/../storage/statuses.json'),
    'utf8',
  );

  /* All Statuses */
  const statuses = JSON.parse(allStatuses);
  /* Parsing Current Status */
  const status = JSON.parse(currentStatus);

  const currentTime = dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]');

  if (
    dayjs(status.lastUpdated.replace(' AM', ''))
      .add(1, 'minutes')
      .isBefore(currentTime) &&
    status.status !== 0
  ) {
    const data = JSON.stringify(
      { status: 0, lastUpdated: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z] A') },
      null,
      4,
    );
    fs.writeFileSync(join(__dirname + '/../storage/status.json'), data, 'utf8');
  } else if (status.status === 0) {
    console.log('offline already, no need to update');
  } else {
    console.log('I am online.');
  }

  res.json({
    ...statuses[status.status],
    lastUpdated: status.lastUpdated,
  });
});

/* Post Status */

router.post('/status', auth, (req, res) => {
  const status = req.body.status;

  if (status === undefined) {
    return res.status(422).json({
      message: 'Error: Missing required Body',
    });
  }

  if (isNaN(status)) {
    return res.status(422).json({
      message: `Error: Status must be a integer, received type ${typeof status}`,
    });
  }

  if (status > 3 || status < 0) {
    return res.status(422).json({
      message: 'Error: Status is too high or too low',
    });
  }

  try {
    const data = JSON.stringify(
      { status, lastUpdated: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z] A') },
      null,
      4,
    );
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
