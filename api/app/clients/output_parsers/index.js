const handleOutputs = require('./handleOutputs');
const addImages = require('./addImages');

module.exports = {
  addImages,
  ...handleOutputs,
};
