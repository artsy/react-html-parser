const VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;

/**
 * @type {Record<string, boolean>}
 */
const nameCache = {};

/**
 * @param {string} tagName
 */
export default function isValidTagOrAttributeName(tagName) {
  if (!nameCache.hasOwnProperty(tagName)) {
    nameCache[tagName] = VALID_TAG_REGEX.test(tagName);
  }
  return nameCache[tagName];
}
