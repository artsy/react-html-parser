import React from 'react';
import processNodes from '../processNodes';
import generatePropsFromAttributes from '../utils/generatePropsFromAttributes';
import VoidElements from '../dom/elements/VoidElements';
import isValidTagOrAttributeName from '../utils/isValidTagOrAttributeName';

/**
 * Converts any element (excluding style - see StyleElementType - and script) to a react element.
 *
 * @param {Element} node The tag node
 * @param {number} index The index of the React element relative to it's parent
 * @param {((node: Node, index: number) => React.ReactNode)=} transform Transform function to optionally apply to nodes
 * @returns {React.ReactNode} The React tag element
 */
export default function TagElementType(node, index, transform) {
  const tagName = node.tagName.toLowerCase();

  // validate tag name
  if (!isValidTagOrAttributeName(tagName)) {
    return null;
  }

  // generate props
  const props = generatePropsFromAttributes(node.attributes, index);

  // If the node is not a void element and has children then process them
  let children = null;
  if (VoidElements.indexOf(tagName) === -1) {
    children = processNodes(node.childNodes, transform);
  }

  // create and return the element
  return React.createElement(tagName, props, children);
}
