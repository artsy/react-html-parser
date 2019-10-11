import StyleElementType from '../../../src/elementTypes/StyleElementType';

describe('Testing `elementTypes/StyleElementType', () => {
  it('should return a `style` element with a single text child if the node has children', () => {
    const node = document.createElement('style');
    node.setAttribute('prop1', 'value1');
    node.setAttribute('prop2', 'value2');
    node.innerText = 'style data';

    const styleElement = StyleElementType(node, 'key');
    expect(styleElement.type).toBe('style');
    expect(styleElement.props).toEqual({
      prop1: 'value1',
      prop2: 'value2',
      children: 'style data'
    });
  });

  it('should return a `style` element with no children if the node has no children', () => {
    const node = document.createElement('style');
    node.setAttribute('prop1', 'value1');
    node.setAttribute('prop2', 'value2');

    const styleElement = StyleElementType(node, 'key');
    expect(styleElement.type).toBe('style');
    expect(styleElement.props).toEqual({
      prop1: 'value1',
      prop2: 'value2',
      children: undefined
    });
  });
});
