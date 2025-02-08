const convert = require('./convert');
const avatar = require('./avatar');
const encode = require('./encode');
const resize = require('./resize');
const parse = require('./parse');

module.exports = {
  ...convert,
  ...encode,
  ...parse,
  ...resize,
  avatar,
};
