const createContextHandlers = require('./createContextHandlers');
const createVisionPrompt = require('./createVisionPrompt');
const addCacheControl = require('./addCacheControl');
const formatMessages = require('./formatMessages');
const summaryPrompts = require('./summaryPrompts');
const handleInputs = require('./handleInputs');
const instructions = require('./instructions');
const titlePrompts = require('./titlePrompts');
const truncate = require('./truncate');

module.exports = {
  addCacheControl,
  ...formatMessages,
  ...summaryPrompts,
  ...handleInputs,
  ...instructions,
  ...titlePrompts,
  ...truncate,
  createVisionPrompt,
  createContextHandlers,
};
