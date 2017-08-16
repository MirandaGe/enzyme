Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = elementToTree;

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function nodeTypeFromType(type) {
  if (typeof type === 'string') {
    return 'host';
  }
  if (type && type.prototype && typeof type.prototype.render === 'function') {
    return 'class';
  }
  return 'function';
}

function elementToTree(el) {
  if (el === null || (typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || !('type' in el)) {
    return el;
  }
  var type = el.type,
      props = el.props,
      key = el.key,
      ref = el.ref;
  var children = props.children;

  var rendered = null;
  if (Array.isArray(children)) {
    rendered = (0, _flatten2['default'])(children, true).map(elementToTree);
  } else if (children !== undefined) {
    rendered = elementToTree(children);
  }
  return {
    nodeType: nodeTypeFromType(type),
    type: type,
    props: props,
    key: key,
    ref: ref,
    instance: null,
    rendered: rendered
  };
}