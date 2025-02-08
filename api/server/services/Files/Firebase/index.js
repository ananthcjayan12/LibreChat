const initialize = require('./initialize');
const images = require('./images');
const crud = require('./crud');

module.exports = {
  ...crud,
  ...images,
  ...initialize,
};
