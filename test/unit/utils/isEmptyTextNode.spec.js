import isEmptyTextNode from '../../../src/utils/isEmptyTextNode';

describe('Testing `utils/isEmptyTextNode`', () => {
  it('should return true for text nodes that contain a line break', () => {
    const texts = [
      '\n',
      '   \n',
      '\n   ',
      '    \n   ',
      '\r\n',
      '   \r\n',
      '\r\n   ',
      '    \r\n   '
    ];
    texts.forEach(text => {
      const node = document.createElement('div');
      node.innerHTML = text;
      expect(Array.from(node.childNodes).every(isEmptyTextNode)).toBe(true);
    });
  });

  it('should return false for text nodes not containing a line break', () => {
    const node = document.createElement('div');
    node.innerText = ' ';
    expect(isEmptyTextNode(node.firstChild)).toBe(false);
  });

  it('should return false for non text nodes', () => {
    const node = document.createElement('div');
    expect(isEmptyTextNode(node)).toBe(false);
  });
});
