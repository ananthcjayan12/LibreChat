const { deleteNullOrEmptyConversations } = require('~/models/Conversation');
const { logger } = require('~/config');
const cleanup = async () => {
  try {
    await deleteNullOrEmptyConversations();
  } catch (error) {
    logger.error('[cleanup] Error during app cleanup', error);
  } finally {
    logger.debug('Startup cleanup complete');
  }
};

module.exports = { cleanup };
