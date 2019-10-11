import isEmptyTextNode from './utils/isEmptyTextNode';
import convertNodeToElement from './convertNodeToElement';

/**
 * Processes the nodes and convert them all into React elements
 *
 * @param {NodeList | Node[]} nodes List of nodes to process
 * @param {((node: Node, index: number) => React.ReactNode)=} transform Transform function to optionally apply to nodes
 * @returns {React.ReactNode[]} The list of processed React elements
 */
export default function processNodes(nodes, transform) {
  return Array.from(nodes)
    .filter(node => !isEmptyTextNode(node))
    .map((node, index) => {
      // return the result of the transform function if applicable
      let transformed;
      if (typeof transform === 'function') {
        transformed = transform(node, index);
        if (transformed === null || !!transformed) {
          return transformed;
        }
      }

      // otherwise convert the node as standard
      return convertNodeToElement(node, index, transform);
    });
}
