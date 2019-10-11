import BooleanAttributes from '../dom/attributes/BooleanAttributes';
import ReactAttributes from '../dom/attributes/ReactAttributes';
import isValidTagOrAttributeName from './isValidTagOrAttributeName';

/**
 * Returns the parsed attribute value taking into account things like boolean attributes
 *
 * @param {String} attribute The name of the attribute
 * @param {*} value The value of the attribute from the HTML
 * @returns {*} The parsed attribute value
 */
const getParsedAttributeValue = function(attribute, value) {
  // if the attribute if a boolean then it's value should be the same as it's name
  // e.g. disabled="disabled"
  let lowerBooleanAttributes = BooleanAttributes.map(attr =>
    attr.toLowerCase()
  );
  if (lowerBooleanAttributes.indexOf(attribute.toLowerCase()) >= 0) {
    value = attribute;
  }

  return value;
};

/**
 * Takes an object of standard HTML property names and converts them to their React counterpart. If the react
 * version does not exist for an attribute then just use it as it is
 *
 * @param {NamedNodeMap} attributes The HTML attributes to convert
 * @returns {Object} The React attributes
 */
export default function htmlAttributesToReact(attributes) {
  return Array.from(attributes)
    .filter(attribute => isValidTagOrAttributeName(attribute.name))
    .reduce(
      /**
       * @param {Record<string, any>} mappedAttributes
       * @param {Attr} attribute
       */
      (mappedAttributes, attribute) => {
        // lowercase the attribute name and find it in the react attribute map
        const lowerCaseAttribute = attribute.name.toLowerCase();

        // format the attribute name
        const name = ReactAttributes[lowerCaseAttribute] || lowerCaseAttribute;

        // add the parsed attribute value to the mapped attributes
        mappedAttributes[name] = getParsedAttributeValue(name, attribute.value);

        return mappedAttributes;
      },
      {}
    );
}
