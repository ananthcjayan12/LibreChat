const getEndpointsConfig = require('./getEndpointsConfig');
const loadAsyncEndpoints = require('./loadAsyncEndpoints');
const loadOverrideConfig = require('./loadOverrideConfig');
const loadDefaultModels = require('./loadDefaultModels');
const loadConfigModels = require('./loadConfigModels');
const loadCustomConfig = require('./loadCustomConfig');
const getCustomConfig = require('./getCustomConfig');
const { config } = require('./EndpointService');

module.exports = {
  config,
  loadCustomConfig,
  loadConfigModels,
  loadDefaultModels,
  loadOverrideConfig,
  loadAsyncEndpoints,
  ...getCustomConfig,
  ...getEndpointsConfig,
};
