const TavilySearchResults = require('./structured/TavilySearchResults');
const TraversaalSearch = require('./structured/TraversaalSearch');
const GoogleSearchAPI = require('./structured/GoogleSearch');
const StructuredSD = require('./structured/StableDiffusion');
const StructuredACS = require('./structured/AzureAISearch');
const createYouTubeTools = require('./structured/YouTube');
const StructuredWolfram = require('./structured/Wolfram');
const OpenWeather = require('./structured/OpenWeather');
const availableTools = require('./manifest.json');
// Structured Tools
const DALLE3 = require('./structured/DALLE3');

/** @type {Record<string, TPlugin | undefined>} */
const manifestToolMap = {};

/** @type {Array<TPlugin>} */
const toolkits = [];

availableTools.forEach((tool) => {
  manifestToolMap[tool.pluginKey] = tool;
  if (tool.toolkit === true) {
    toolkits.push(tool);
  }
});

module.exports = {
  toolkits,
  availableTools,
  manifestToolMap,
  // Structured Tools
  DALLE3,
  OpenWeather,
  StructuredSD,
  StructuredACS,
  GoogleSearchAPI,
  TraversaalSearch,
  StructuredWolfram,
  createYouTubeTools,
  TavilySearchResults,
};
