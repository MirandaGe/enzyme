var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _enzyme = require('enzyme');

var _enzymeAdapterUtils = require('enzyme-adapter-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function typeToNodeType(type) {
  if (typeof type === 'function') {
    if (typeof type.prototype.render === 'function') {
      return 'class';
    }
    return 'function';
  }
  return 'host';
}

function instanceToTree(inst) {
  if (!inst || (typeof inst === 'undefined' ? 'undefined' : _typeof(inst)) !== 'object') {
    return inst;
  }
  var el = inst._currentElement;
  if (!el) {
    return null;
  }
  if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object') {
    return el;
  }
  if (inst._tag) {
    if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object') {
      return el;
    }
    var children = inst._renderedChildren || { '.0': el.props.children };
    return {
      nodeType: 'host',
      type: el.type,
      props: el.props,
      key: el.key,
      ref: el.ref,
      instance: _reactDom2['default'].findDOMNode(inst.getPublicInstance()) || null,
      rendered: (0, _object2['default'])(children).map(instanceToTree)
    };
  }
  if (inst._renderedComponent) {
    return {
      nodeType: typeToNodeType(el.type),
      type: el.type,
      props: el.props,
      key: el.key,
      ref: el.ref,
      instance: inst._instance || null,
      rendered: instanceToTree(inst._renderedComponent)
    };
  }
  throw new Error('Enzyme Internal Error: unknown instance encountered');
}

var SimpleWrapper = function (_React$Component) {
  _inherits(SimpleWrapper, _React$Component);

  function SimpleWrapper() {
    _classCallCheck(this, SimpleWrapper);

    return _possibleConstructorReturn(this, (SimpleWrapper.__proto__ || Object.getPrototypeOf(SimpleWrapper)).apply(this, arguments));
  }

  _createClass(SimpleWrapper, [{
    key: 'render',
    value: function () {
      function render() {
        return this.props.node || null;
      }

      return render;
    }()
  }]);

  return SimpleWrapper;
}(_react2['default'].Component);

SimpleWrapper.propTypes = { node: _propTypes2['default'].node.isRequired };

var ReactFifteenAdapter = function (_EnzymeAdapter) {
  _inherits(ReactFifteenAdapter, _EnzymeAdapter);

  function ReactFifteenAdapter() {
    _classCallCheck(this, ReactFifteenAdapter);

    return _possibleConstructorReturn(this, (ReactFifteenAdapter.__proto__ || Object.getPrototypeOf(ReactFifteenAdapter)).apply(this, arguments));
  }

  _createClass(ReactFifteenAdapter, [{
    key: 'createMountRenderer',
    value: function () {
      function createMountRenderer(options) {
        (0, _enzymeAdapterUtils.assertDomAvailable)('mount');
        var domNode = options.attachTo || global.document.createElement('div');
        var instance = null;
        return {
          render: function () {
            function render(el /* , context */) {
              var wrappedEl = _react2['default'].createElement(SimpleWrapper, {
                node: el
              });
              instance = _reactDom2['default'].render(wrappedEl, domNode);
            }

            return render;
          }(),
          unmount: function () {
            function unmount() {
              _reactDom2['default'].unmountComponentAtNode(domNode);
            }

            return unmount;
          }(),
          getNode: function () {
            function getNode() {
              return instanceToTree(instance._reactInternalInstance._renderedComponent);
            }

            return getNode;
          }(),
          simulateEvent: function () {
            function simulateEvent(node, event, mock) {
              var mappedEvent = (0, _enzymeAdapterUtils.mapNativeEventNames)(event);
              var eventFn = _reactAddonsTestUtils2['default'].Simulate[mappedEvent];
              if (!eventFn) {
                throw new TypeError('ReactWrapper::simulate() event \'' + String(event) + '\' does not exist');
              }
              // eslint-disable-next-line react/no-find-dom-node
              eventFn(_reactDom2['default'].findDOMNode(node.instance), mock);
            }

            return simulateEvent;
          }(),
          batchedUpdates: function () {
            function batchedUpdates(fn) {
              return _reactDom2['default'].unstable_batchedUpdates(fn);
            }

            return batchedUpdates;
          }()
        };
      }

      return createMountRenderer;
    }()
  }, {
    key: 'createShallowRenderer',
    value: function () {
      function createShallowRenderer() /* options */{
        var renderer = _reactAddonsTestUtils2['default'].createRenderer();
        var isDOM = false;
        var cachedNode = null;
        return {
          render: function () {
            function render(el, context) {
              cachedNode = el;
              /* eslint consistent-return: 0 */
              if (typeof el.type === 'string') {
                isDOM = true;
              } else {
                isDOM = false;
                return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                  return renderer.render(el, context);
                });
              }
            }

            return render;
          }(),
          unmount: function () {
            function unmount() {
              renderer.unmount();
            }

            return unmount;
          }(),
          getNode: function () {
            function getNode() {
              if (isDOM) {
                return (0, _enzymeAdapterUtils.elementToTree)(cachedNode);
              }
              var output = renderer.getRenderOutput();
              return {
                nodeType: 'class',
                type: cachedNode.type,
                props: cachedNode.props,
                key: cachedNode.key,
                ref: cachedNode.ref,
                instance: renderer._instance._instance,
                rendered: (0, _enzymeAdapterUtils.elementToTree)(output)
              };
            }

            return getNode;
          }(),
          simulateEvent: function () {
            function simulateEvent(node, event) {
              for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
              }

              var handler = node.props[(0, _enzymeAdapterUtils.propFromEvent)(event)];
              if (handler) {
                (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                  // TODO(lmr): create/use synthetic events
                  // TODO(lmr): emulate React's event propagation
                  _reactDom2['default'].unstable_batchedUpdates(function () {
                    handler.apply(undefined, _toConsumableArray(args));
                  });
                });
              }
            }

            return simulateEvent;
          }(),
          batchedUpdates: function () {
            function batchedUpdates(fn) {
              return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                return _reactDom2['default'].unstable_batchedUpdates(fn);
              });
            }

            return batchedUpdates;
          }()
        };
      }

      return createShallowRenderer;
    }()
  }, {
    key: 'createStringRenderer',
    value: function () {
      function createStringRenderer() /* options */{
        return {
          render: function () {
            function render(el /* , context */) {
              return _server2['default'].renderToStaticMarkup(el);
            }

            return render;
          }()
        };
      }

      return createStringRenderer;
    }()

    // Provided a bag of options, return an `EnzymeRenderer`. Some options can be implementation
    // specific, like `attach` etc. for React, but not part of this interface explicitly.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: 'createRenderer',
    value: function () {
      function createRenderer(options) {
        switch (options.mode) {
          case _enzyme.EnzymeAdapter.MODES.MOUNT:
            return this.createMountRenderer(options);
          case _enzyme.EnzymeAdapter.MODES.SHALLOW:
            return this.createShallowRenderer(options);
          case _enzyme.EnzymeAdapter.MODES.STRING:
            return this.createStringRenderer(options);
          default:
            throw new Error('Enzyme Internal Error: Unrecognized mode: ' + String(options.mode));
        }
      }

      return createRenderer;
    }()

    // converts an RSTNode to the corresponding JSX Pragma Element. This will be needed
    // in order to implement the `Wrapper.mount()` and `Wrapper.shallow()` methods, but should
    // be pretty straightforward for people to implement.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: 'nodeToElement',
    value: function () {
      function nodeToElement(node) {
        if (!node || (typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') return null;
        return _react2['default'].createElement(node.type, node.props);
      }

      return nodeToElement;
    }()
  }, {
    key: 'elementToNode',
    value: function () {
      function elementToNode(element) {
        return (0, _enzymeAdapterUtils.elementToTree)(element);
      }

      return elementToNode;
    }()
  }, {
    key: 'nodeToHostNode',
    value: function () {
      function nodeToHostNode(node) {
        return _reactDom2['default'].findDOMNode(node.instance);
      }

      return nodeToHostNode;
    }()
  }, {
    key: 'isValidElement',
    value: function () {
      function isValidElement(element) {
        return _react2['default'].isValidElement(element);
      }

      return isValidElement;
    }()
  }, {
    key: 'createElement',
    value: function () {
      function createElement() {
        return _react2['default'].createElement.apply(_react2['default'], arguments);
      }

      return createElement;
    }()
  }]);

  return ReactFifteenAdapter;
}(_enzyme.EnzymeAdapter);

module.exports = ReactFifteenAdapter;