const express = require('express');
const {
  setHeaders,
  handleAbort,
  validateModel,
  validateEndpoint,
  buildEndpointOption,
} = require('~/server/middleware');
const { initializeClient, addTitle } = require('~/server/services/Endpoints/google');
const AskController = require('~/server/controllers/AskController');

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
