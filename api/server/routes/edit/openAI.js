const express = require('express');
const {
  handleAbort,
  setHeaders,
  validateModel,
  validateEndpoint,
  buildEndpointOption,
  moderateText,
} = require('~/server/middleware');
const { initializeClient } = require('~/server/services/Endpoints/openAI');
const EditController = require('~/server/controllers/EditController');

const router = express.Router();
router.use(moderateText);
router.post('/abort', handleAbort());

router.post(
  '/',
  validateEndpoint,
  validateModel,
  buildEndpointOption,
  setHeaders,
  async (req, res, next) => {
    await EditController(req, res, next, initializeClient);
  },
);

module.exports = router;
