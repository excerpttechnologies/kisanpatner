const express = require('express');
const router = express.Router();

// Minimal stub endpoints for locations
router.get('/states', (req, res) => {
  res.json({ states: [] });
});

router.get('/districts/:state', (req, res) => {
  res.json({ districts: [] });
});

router.get('/talukas/:district', (req, res) => {
  res.json({ talukas: [] });
});

module.exports = router;
