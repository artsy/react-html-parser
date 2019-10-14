# React HTML Parser

_NOTE: This Artsy fork replaces the htmlparser2 dependency with the `DOMParser` API provided by modern browsers. As such,
the nodes that you get to operate on have a slightly different API. This also means that out-of-the-box this code only
works in browser environments. If needed, a different environment can polyfill the `DOMParser` and `Node` API, as shown
[here](https://github.com/artsy/reaction/blob/0be2c23baea8c51dca588f9543c7f22c26f2faaa/src/Polyfills/DOMParser.ts)_

A utility for converting HTML strings into [React](https://facebook.github.io/react/) components. Avoids the use of dangerouslySetInnerHTML and converts standard HTML elements, attributes and inline styles into their React equivalents.

[Try the Live Demo](https://wrakky.github.io/react-html-parser)

[![Travis branch](https://img.shields.io/travis/wrakky/react-html-parser/master.svg)](https://travis-ci.org/wrakky/react-html-parser)
[![Coveralls](https://img.shields.io/coveralls/wrakky/react-html-parser.svg)](https://coveralls.io/github/wrakky/react-html-parser)
[![npm](https://img.shields.io/npm/v/react-html-parser.svg)](https://www.npmjs.com/package/react-html-parser)
[![Downloads](https://img.shields.io/npm/dw/react-html-parser.svg)](https://www.npmjs.com/package/react-html-parser)
[![David](https://img.shields.io/david/wrakky/react-html-parser.svg)](https://david-dm.org/wrakky/react-html-parser)

## Install

```bash
npm install @artsy/react-html-parser
# or
yarn add @artsy/react-html-parser
```

## Usage

```javascript
import React from 'react';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement
} from 'react-html-parser';

class HtmlComponent extends React.Component {
  render() {
    const html = '<div>Example HTML string</div>';
    return <div>{ReactHtmlParser(html)}</div>;
  }
}
```

## API

### `function ReactHtmlParser(html, [options])`

Takes an HTML string and returns equivalent React elements

#### Usage

```js
import ReactHtmlParser from 'react-html-parser';
```

#### Arguments

- `html`: The HTML string to parse
- `options`: Options object
  - transform _(function)_: Transform function that is applied to every node
  - preprocessNodes _(function)_: Pre-process the nodes generated by `DOMParser`

#### Transform Function

The transform function will be called for every node that is parsed by the library.

`function transform(node, index)`

##### Arguments

- `node`: The node being parsed. This is a plain [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) /
  [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) as otherwise generated by the browser.

#### Return Types

`return null`
Returning null will prevent the node and all of it's children from being rendered.

```js
function transform(node) {
  // do not render any <span> tags
  if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
    return null;
  }
}
```

`return undefined`
If the function does not return anything, or returns undefined, then the default behaviour will occur and the parser will continue was usual.

`return React element`
React elements can be returned directly

```js
import React from 'react';
function transform(node) {
  if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'B') {
    return <div>This was a bold tag</div>;
  }
}
```

#### preprocessNodes Function

Allows pre-processing the nodes generated from the html by `DOMParser` before being passed to the library and converted to React elements.

`function preprocessNodes(nodes)`

##### Arguments

- `nodes`: The entire node tree generated by `DOMParser`.

##### Return type

The `preprocessNodes` function should return a valid `DOMParser` node tree.

### `function convertNodeToElement(node, index, transform)`

Processes a node and returns the React element to be rendered. This function can be used in conjunction with the previously described `transform` function to continue to process a node after modifying it.

#### Usage

```js
import { convertNodeToElement } from 'react-html-parser';
```

#### Arguments

- `node`: The node to process
- `index` (number): The index of the node in relation to it's parent
- `transform`: The transform function as described above

```js
import { convertNodeToElement } from 'react-html-parser';
function transform(node, index) {
  // convert <ul> to <ol>
  if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'UL') {
    node.name = 'ol';
    return convertNodeToElement(node, index, transform);
  }
}
```
