/*
 * Map each htmlparser2 element type to a function which will convert that element type to a React element
 * Not all of the element types are supported so the UnsupportedElementType is used for them which will not return any
 * value
 */

import TextElementType from './TextElementType';
import TagElementType from './TagElementType';
import StyleElementType from './StyleElementType';
import UnsupportedElementType from './UnsupportedElementType';

const CONSTANTS = {
  [Node.TEXT_NODE]: TextElementType,
  [Node.ELEMENT_NODE]: TagElementType,
  // [ElementType.Directive]: UnsupportedElementType,
  [Node.COMMENT_NODE]: UnsupportedElementType,
  [Node.CDATA_SECTION_NODE]: UnsupportedElementType,
  [Node.DOCUMENT_TYPE_NODE]: UnsupportedElementType
};

/**
 * @param {Node} node
 */
export default node => {
  if (node.nodeName === 'SCRIPT') {
    return UnsupportedElementType;
  }
  if (node.nodeName === 'STYLE') {
    return StyleElementType;
  } else {
    return CONSTANTS[node.nodeType] || UnsupportedElementType;
  }
};
