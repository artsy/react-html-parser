/**
 * Tests a node and returns whether is it a text node at the start and end of the line containing only
 * white space. This allows these node types to be excluded from the rendering because they are unnecessary.
 *
 * @param {Node} node The element object
 * @returns {boolean} Whether the node is an empty text node
 */
export default function isEmptyTextNode(node) {
  return (
    node.nodeType === Node.TEXT_NODE &&
    (!node.textContent ||
      (/\r?\n/.test(node.textContent) && node.textContent.trim() === ''))
  );
}
