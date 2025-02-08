const resetPasswordLimiter = require('./resetPasswordLimiter');
const verifyEmailLimiter = require('./verifyEmailLimiter');
const messageLimiters = require('./messageLimiters');
const registerLimiter = require('./registerLimiter');
const toolCallLimiter = require('./toolCallLimiter');
const importLimiters = require('./importLimiters');
const createSTTLimiters = require('./sttLimiters');
const createTTSLimiters = require('./ttsLimiters');
const uploadLimiters = require('./uploadLimiters');
const loginLimiter = require('./loginLimiter');

module.exports = {
  ...uploadLimiters,
  ...importLimiters,
  ...messageLimiters,
  loginLimiter,
  registerLimiter,
  toolCallLimiter,
  createTTSLimiters,
  createSTTLimiters,
  verifyEmailLimiter,
  resetPasswordLimiter,
};
