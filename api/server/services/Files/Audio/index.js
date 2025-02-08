const getCustomConfigSpeech = require('./getCustomConfigSpeech');
const STTService = require('./STTService');
const TTSService = require('./TTSService');
const getVoices = require('./getVoices');

module.exports = {
  getVoices,
  getCustomConfigSpeech,
  ...STTService,
  ...TTSService,
};
