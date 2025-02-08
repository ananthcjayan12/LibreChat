const streamResponse = require('./streamResponse');
const countTokens = require('./countTokens');
const removePorts = require('./removePorts');
const handleText = require('./handleText');
const sendEmail = require('./sendEmail');
const cryptoUtils = require('./crypto');
const files = require('./files');
const queue = require('./queue');
const math = require('./math');

/**
 * Check if email configuration is set
 * @returns {Boolean}
 */
function checkEmailConfig() {
  return (
    (!!process.env.EMAIL_SERVICE || !!process.env.EMAIL_HOST) &&
    !!process.env.EMAIL_USERNAME &&
    !!process.env.EMAIL_PASSWORD &&
    !!process.env.EMAIL_FROM
  );
}

module.exports = {
  ...streamResponse,
  checkEmailConfig,
  ...cryptoUtils,
  ...handleText,
  countTokens,
  removePorts,
  sendEmail,
  ...files,
  ...queue,
  math,
};
