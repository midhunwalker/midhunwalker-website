const express = require('express');
const router = express.Router();

// Dummy user growth data
const userGrowthData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  values: [1200, 1250, 1300, 1350, 1420, 1450, 1500]
};

// GET /api/user-growth
router.get('/user-growth', (req, res) => {
  res.json(userGrowthData);
});

module.exports = router;
