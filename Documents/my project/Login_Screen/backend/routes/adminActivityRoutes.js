// Import Express framework
const express = require('express');

// Create a new router instance
const router = express.Router();

// Dummy data to simulate sub-admin activity (for charts or dashboard UI)
const activityData = {
  labels: ['Sub Admin 1', 'Sub Admin 2', 'Sub Admin 3', 'Sub Admin 4'], // X-axis labels (names of sub-admins)
  datasets: [
    {
      label: 'Actions Completed',               // Label for the data set (legend)
      data: [15, 8, 12, 5],                     // Y-axis values (number of actions)
      backgroundColor: 'rgba(167, 139, 250, 0.7)', // Bar fill color
      borderColor: 'rgba(167, 139, 250, 1)',       // Bar border color
      borderWidth: 1                               // Width of bar borders
    }
  ]
};

// Define a GET route at /api/admin-activity to return the activity data
router.get('/admin-activity', (req, res) => {
  res.json(activityData); // Send the data as JSON to the client
});

// Export the router so it can be used in the main server file (CommonJS style)
module.exports = router;
