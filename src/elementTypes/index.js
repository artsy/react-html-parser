/*
 * Map each element type to a function which will convert that element type to a React element
 * Not all of the element types are supported so the UnsupportedElementType is used for them which will not return any
 * value
 */

import TextElementType from './TextElementType';
import TagElementType from './TagElementType';
import StyleElementType from './StyleElementType';
import UnsupportedElementType from './UnsupportedElementType';

/**
 * @param {Node} node
 */
export default node => {
  if (node.nodeName === 'SCRIPT') {
    return UnsupportedElementType;
  }
  if (node.nodeName === 'STYLE') {
    return StyleElementType;
  }
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return TextElementType;
    case Node.ELEMENT_NODE:
      return TagElementType;
    default:
      return UnsupportedElementType;
  }
};
