const facebookLogin = require('./facebookStrategy');
const discordLogin = require('./discordStrategy');
const passportLogin = require('./localStrategy');
const githubLogin = require('./githubStrategy');
const googleLogin = require('./googleStrategy');
const setupOpenId = require('./openidStrategy');
const appleLogin = require('./appleStrategy');
const ldapLogin = require('./ldapStrategy');
const jwtLogin = require('./jwtStrategy');

module.exports = {
  appleLogin,
  passportLogin,
  googleLogin,
  githubLogin,
  discordLogin,
  jwtLogin,
  facebookLogin,
  setupOpenId,
  ldapLogin,
};