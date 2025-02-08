const initialize = require('./initialize');
const build = require('./build');

module.exports = {
  ...build,
  ...initialize,
};
