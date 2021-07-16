const { Router } = require('express');
// const axios = require('axios');

const router = Router();

const statuses = {
  0: {
    status: 'offline',
    color: 'gray',
    emoji: 'bx-sleepy',
  },
  1: {
    status: 'online',
    color: 'green',
    emoji: 'bxs-circle bx-flashing',
  },
  2: {
    status: 'busy',
    color: 'red',
    emoji: 'bxs-circle bx-flashing',
  },
};

router.get('/status', (req, res) => {
  res.json({
    ...statuses['1'],
    lastUpdated: new Date(Date.now() - 30000 * 60),
  });
});

module.exports = router;
