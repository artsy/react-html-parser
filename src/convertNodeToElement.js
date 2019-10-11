import ElementTypes from './elementTypes';

/**
 * Converts a node to a React element
 *
 * @param {Node} node The node to convert
 * @param {number} index The index of the current node
 * @param {((node: Node, index: number) => React.ReactNode)=} transform Transform function to optionally apply to nodes
 * @returns {React.ReactNode}
 */
export default function convertNodeToElement(node, index, transform) {
  /**
   * @type {any}
   */
  const n = node;
  return ElementTypes(node)(n, index, transform);
}
