import TextElementType from '../../../src/elementTypes/TextElementType';

describe('Testing `elementTypes/TextElementType', () => {
  it('should return the value from the node data property', () => {
    const node = document.createElement('div');
    node.innerText = 'test';
    expect(TextElementType(node.firstChild)).toBe('test');
  });
});
