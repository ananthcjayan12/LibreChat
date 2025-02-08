const express = require('express');
const {
  handleAbort,
  setHeaders,
  validateModel,
  validateEndpoint,
  buildEndpointOption,
} = require('~/server/middleware');
const { initializeClient } = require('~/server/services/Endpoints/custom');
const AskController = require('~/server/controllers/AskController');
const { addTitle } = require('~/server/services/Endpoints/openAI');

const router = express.Router();

router.post('/abort', handleAbort());

router.post(
  '/',
  validateEndpoint,
  validateModel,
  buildEndpointOption,
  setHeaders,
  async (req, res, next) => {
    await AskController(req, res, next, initializeClient, addTitle);
  },
);

module.exports = router;
