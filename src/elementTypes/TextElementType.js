/**
 * Converts a text node to a React text element
 *
 * @param {Node} node The text node
 * @returns {string | null} The text
 */
export default function TextElementType(node) {
  // React will accept plain text for rendering so just return the node data
  return node.textContent;
}
