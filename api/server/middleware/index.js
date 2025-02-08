const validatePasswordReset = require('./validatePasswordReset');
const validateImageRequest = require('./validateImageRequest');
const validateRegistration = require('./validateRegistration');
const buildEndpointOption = require('./buildEndpointOption');
const checkDomainAllowed = require('./checkDomainAllowed');
const validateMessageReq = require('./validateMessageReq');
const concurrentLimiter = require('./concurrentLimiter');
const canDeleteAccount = require('./canDeleteAccount');
const requireLocalAuth = require('./requireLocalAuth');
const validateEndpoint = require('./validateEndpoint');
const abortMiddleware = require('./abortMiddleware');
const checkInviteUser = require('./checkInviteUser');
const requireLdapAuth = require('./requireLdapAuth');
const requireJwtAuth = require('./requireJwtAuth');
const validateModel = require('./validateModel');
const moderateText = require('./moderateText');
const setHeaders = require('./setHeaders');
const checkBan = require('./checkBan');
const limiters = require('./limiters');
const uaParser = require('./uaParser');
const validate = require('./validate');
const noIndex = require('./noIndex');
const roles = require('./roles');

module.exports = {
  ...abortMiddleware,
  ...validate,
  ...limiters,
  ...roles,
  noIndex,
  checkBan,
  uaParser,
  setHeaders,
  moderateText,
  validateModel,
  requireJwtAuth,
  checkInviteUser,
  requireLdapAuth,
  requireLocalAuth,
  canDeleteAccount,
  validateEndpoint,
  concurrentLimiter,
  checkDomainAllowed,
  validateMessageReq,
  buildEndpointOption,
  validateRegistration,
  validateImageRequest,
  validatePasswordReset,
};
