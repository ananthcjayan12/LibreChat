const mongoose = require('mongoose');
const tokenSchema = require('./schema/tokenSchema');
const { logger } = require('~/config');

/**
 * Token model.
 * @type {mongoose.Model}
 */
const Token = mongoose.model('Token', tokenSchema);
/**
 * Fixes the indexes for the Token collection from legacy TTL indexes to the new expiresAt index.
 */
async function fixIndexes() {
  try {
    const indexes = await Token.collection.indexes();
    logger.debug('Existing Token Indexes:', indexes);
    const unwantedTTLIndexes = indexes.filter(
      (index) => index.key.createdAt === 1 && index.expireAfterSeconds !== undefined,
    );
    for (const index of unwantedTTLIndexes) {
      logger.debug(`Dropping unwanted Token index: ${index.name}`);
      await Token.collection.dropIndex(index.name);
      logger.debug(`Dropped Token index: ${index.name}`);
    }
    const hasExpiresAtIndex = indexes.some(
      (index) => index.key.expiresAt === 1 && index.expireAfterSeconds === 0,
    );
    if (!hasExpiresAtIndex) {
      logger.debug('Creating Token `expiresAt` TTL index.');
      await Token.collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
      logger.debug('Token `expiresAt` TTL index created.');
    } else {
      logger.debug('Token `expiresAt` TTL index already exists.');
    }
    logger.debug('Token index cleanup completed successfully.');
  } catch (error) {
    logger.error('An error occurred while fixing Token indexes:', error);
  }
}

fixIndexes();

/**
 * Creates a new Token instance.
 * @param {Object} tokenData - The data for the new Token.
 * @param {mongoose.Types.ObjectId} tokenData.userId - The user's ID. It is required.
 * @param {String} tokenData.email - The user's email.
 * @param {String} tokenData.token - The token. It is required.
 * @param {Number} tokenData.expiresIn - The number of seconds until the token expires.
 * @returns {Promise<mongoose.Document>} The new Token instance.
 * @throws Will throw an error if token creation fails.
 */
async function createToken(tokenData) {
  try {
    const currentTime = new Date();
    const expiresAt = new Date(currentTime.getTime() + tokenData.expiresIn * 1000);

    const newTokenData = {
      ...tokenData,
      createdAt: currentTime,
      expiresAt,
    };

    return await Token.create(newTokenData);
  } catch (error) {
    logger.debug('An error occurred while creating token:', error);
    throw error;
  }
}

/**
 * Finds a Token document that matches the provided query.
 * @param {Object} query - The query to match against.
 * @param {mongoose.Types.ObjectId|String} query.userId - The ID of the user.
 * @param {String} query.token - The token value.
 * @param {String} [query.email] - The email of the user.
 * @param {String} [query.identifier] - Unique, alternative identifier for the token.
 * @returns {Promise<Object|null>} The matched Token document, or null if not found.
 * @throws Will throw an error if the find operation fails.
 */
async function findToken(query) {
  try {
    const conditions = [];

    if (query.userId) {
      conditions.push({ userId: query.userId });
    }
    if (query.token) {
      conditions.push({ token: query.token });
    }
    if (query.email) {
      conditions.push({ email: query.email });
    }
    if (query.identifier) {
      conditions.push({ identifier: query.identifier });
    }

    const token = await Token.findOne({
      $and: conditions,
    }).lean();

    return token;
  } catch (error) {
    logger.debug('An error occurred while finding token:', error);
    throw error;
  }
}

/**
 * Updates a Token document that matches the provided query.
 * @param {Object} query - The query to match against.
 * @param {mongoose.Types.ObjectId|String} query.userId - The ID of the user.
 * @param {String} query.token - The token value.
 * @param {String} [query.email] - The email of the user.
 * @param {String} [query.identifier] - Unique, alternative identifier for the token.
 * @param {Object} updateData - The data to update the Token with.
 * @returns {Promise<mongoose.Document|null>} The updated Token document, or null if not found.
 * @throws Will throw an error if the update operation fails.
 */
async function updateToken(query, updateData) {
  try {
    return await Token.findOneAndUpdate(query, updateData, { new: true });
  } catch (error) {
    logger.debug('An error occurred while updating token:', error);
    throw error;
  }
}

/**
 * Deletes all Token documents that match the provided token, user ID, or email.
 * @param {Object} query - The query to match against.
 * @param {mongoose.Types.ObjectId|String} query.userId - The ID of the user.
 * @param {String} query.token - The token value.
 * @param {String} [query.email] - The email of the user.
 * @param {String} [query.identifier] - Unique, alternative identifier for the token.
 * @returns {Promise<Object>} The result of the delete operation.
 * @throws Will throw an error if the delete operation fails.
 */
async function deleteTokens(query) {
  try {
    return await Token.deleteMany({
      $or: [
        { userId: query.userId },
        { token: query.token },
        { email: query.email },
        { identifier: query.identifier },
      ],
    });
  } catch (error) {
    logger.debug('An error occurred while deleting tokens:', error);
    throw error;
  }
}

module.exports = {
  createToken,
  findToken,
  updateToken,
  deleteTokens,
};
