const express = require('express');
const optionalJwtAuth = require('~/server/middleware/optionalJwtAuth');
const { getBanner } = require('~/models/Banner');
const router = express.Router();

router.get('/', optionalJwtAuth, async (req, res) => {
  try {
    res.status(200).send(await getBanner(req.user));
  } catch (error) {
    res.status(500).json({ message: 'Error getting banner' });
  }
});

module.exports = router;
