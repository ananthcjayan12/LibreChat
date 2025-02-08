const express = require('express');
const {
  setHeaders,
  handleAbort,
  validateModel,
  validateEndpoint,
  buildEndpointOption,
} = require('~/server/middleware');
const { initializeClient } = require('~/server/services/Endpoints/anthropic');
const EditController = require('~/server/controllers/EditController');

const router = express.Router();

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
