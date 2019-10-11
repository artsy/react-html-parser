import TagElementType from '../../../src/elementTypes/TagElementType';

describe('Testing `elementTypes/TagElementType', () => {
  let transform;
  beforeEach(() => {
    transform = function() {};
  });

  it('should return a React element corresponding to the node name', () => {
    const node1 = document.createElement('h1');
    node1.setAttribute('id', 'test');
    node1.innerText = 'node 1 children';
    const node1Element = TagElementType(node1, 'key', transform);
    expect(node1Element.type).toBe('h1');
    expect(node1Element.props).toEqual({
      id: 'test',
      children: ['node 1 children']
    });
  });

  it('should not pass through children for void elements', () => {
    const voidNode = document.createElement('area');
    voidNode.setAttribute('id', 'test');
    voidNode.innerHTML = '<p>foo</p>';

    const voidElement = TagElementType(voidNode, 'key');
    expect(voidElement.type).toBe('area');
    expect(voidElement.props.children).toBe(null);
  });

  xit('should return null for invalid tag types', () => {
    isValidTagOrAttributeName.and.returnValue(false);
    const invalidNode = {
      name: 'invalid'
    };
    expect(TagElementType(invalidNode)).toBeNull();
  });
});
