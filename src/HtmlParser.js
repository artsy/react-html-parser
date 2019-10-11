import processNodes from './processNodes';

(function(DOMParser) {
  var DOMParser_proto = DOMParser.prototype,
    real_parseFromString = DOMParser_proto.parseFromString;
  // Firefox/Opera/IE throw errors on unsupported types
  try {
    // WebKit returns null on unsupported types
    if (new DOMParser().parseFromString('', 'text/html')) {
      // text/html parsing is natively supported
      return;
    }
  } catch (ex) {
    // no-op
  }

  DOMParser_proto.parseFromString = function(markup, type) {
    if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
      var doc = document.implementation.createHTMLDocument('');
      if (markup.toLowerCase().indexOf('<!doctype') > -1) {
        doc.documentElement.innerHTML = markup;
      } else {
        doc.body.innerHTML = markup;
      }
      return doc;
    } else {
      return real_parseFromString.apply(this, [markup, type]);
    }
  };
})(DOMParser);

/**
 * @typedef {Object} HtmlParserOptions
 * @property {((node: Node, index: number) => React.ReactNode)=} transform
 * @property {((nodes: NodeList) => (NodeList | Node[]))=} preprocessNodes
 */

/**
 * Parses a HTML string and returns a list of React components generated from it
 *
 * @param {String} html The HTML to convert into React component
 * @param {HtmlParserOptions} options Options to pass
 * @returns {Array} List of top level React elements
 */
export default function HtmlParser(html, options = {}) {
  const {
    // decodeEntities = true,
    transform,
    // prettier-ignore
    preprocessNodes =
      /**
       * @param {NodeList} nodes
       */
      nodes => nodes
  } = options;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const nodes = doc.body.childNodes;

  // const nodes = preprocessNodes(htmlparser2.parseDOM(html, { decodeEntities }));
  return processNodes(preprocessNodes(nodes), transform);
}
