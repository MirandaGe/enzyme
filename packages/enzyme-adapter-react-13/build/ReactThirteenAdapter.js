var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('react/addons');

var _addons2 = _interopRequireDefault(_addons);

var _ReactContext = require('react/lib/ReactContext');

var _ReactContext2 = _interopRequireDefault(_ReactContext);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _enzyme = require('enzyme');

var _enzymeAdapterUtils = require('enzyme-adapter-utils');

var _ReactThirteenMapNativeEventNames = require('./ReactThirteenMapNativeEventNames');

var _ReactThirteenMapNativeEventNames2 = _interopRequireDefault(_ReactThirteenMapNativeEventNames);

var _ReactThirteenElementToTree = require('./ReactThirteenElementToTree');

var _ReactThirteenElementToTree2 = _interopRequireDefault(_ReactThirteenElementToTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// this fixes some issues in React 0.13 with setState and jsdom...
// see issue: https://github.com/airbnb/enzyme/issues/27
// eslint-disable-next-line import/no-unresolved
require('react/lib/ExecutionEnvironment').canUseDOM = true;

var _ReactAddons$addons = _addons2['default'].addons,
    TestUtils = _ReactAddons$addons.TestUtils,
    _batchedUpdates = _ReactAddons$addons.batchedUpdates;


var getEmptyElementType = function () {
  var EmptyElementType = null;
  // eslint-disable-next-line react/prefer-stateless-function

  var Foo = function (_React$Component) {
    _inherits(Foo, _React$Component);

    function Foo() {
      _classCallCheck(this, Foo);

      return _possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments));
    }

    _createClass(Foo, [{
      key: 'render',
      value: function () {
        function render() {
          return null;
        }

        return render;
      }()
    }]);

    return Foo;
  }(_react2['default'].Component);

  return function () {
    if (EmptyElementType === null) {
      var instance = TestUtils.renderIntoDocument(_react2['default'].createElement(Foo));
      EmptyElementType = instance._reactInternalInstance._renderedComponent._currentElement.type;
    }
    return EmptyElementType;
  };
}();

var _createShallowRenderer = function () {
  function createRendererCompatible() {
    var renderer = TestUtils.createRenderer();
    renderer.render = function (originalRender) {
      return function () {
        function contextCompatibleRender(node) {
          var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          _ReactContext2['default'].current = context;
          originalRender.call(this, _react2['default'].createElement(node.type, node.props), context);
          _ReactContext2['default'].current = {};
          return renderer.getRenderOutput();
        }

        return contextCompatibleRender;
      }();
    }(renderer.render);
    return renderer;
  }

  return createRendererCompatible;
}();

function instanceToTree(inst) {
  if ((typeof inst === 'undefined' ? 'undefined' : _typeof(inst)) !== 'object') {
    return inst;
  }
  var el = inst._currentElement;
  if (!el) {
    return null;
  }
  if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object') {
    return el;
  }
  if (el.type === getEmptyElementType()) {
    return null;
  }
  if (typeof el.type === 'string') {
    var innerInst = inst._renderedComponent;
    var children = innerInst._renderedChildren || { '.0': el._store.props.children };
    return {
      nodeType: 'host',
      type: el.type,
      props: el._store.props,
      key: el.key,
      ref: el.ref,
      instance: inst._instance.getDOMNode(),
      rendered: (0, _object2['default'])(children).map(instanceToTree)
    };
  }
  if (inst._renderedComponent) {
    return {
      nodeType: 'class',
      type: el.type,
      props: el._store.props,
      key: el.key,
      ref: el.ref,
      instance: inst._instance || inst._hostNode || null,
      rendered: instanceToTree(inst._renderedComponent)
    };
  }
  throw new Error('Enzyme Internal Error: unknown instance encountered');
}

var SimpleWrapper = function (_React$Component2) {
  _inherits(SimpleWrapper, _React$Component2);

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

var ReactThirteenAdapter = function (_EnzymeAdapter) {
  _inherits(ReactThirteenAdapter, _EnzymeAdapter);

  function ReactThirteenAdapter() {
    _classCallCheck(this, ReactThirteenAdapter);

    return _possibleConstructorReturn(this, (ReactThirteenAdapter.__proto__ || Object.getPrototypeOf(ReactThirteenAdapter)).apply(this, arguments));
  }

  _createClass(ReactThirteenAdapter, [{
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
              instance = _react2['default'].render(wrappedEl, domNode);
            }

            return render;
          }(),
          unmount: function () {
            function unmount() {
              _react2['default'].unmountComponentAtNode(domNode);
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
              var mappedEvent = (0, _ReactThirteenMapNativeEventNames2['default'])(event);
              var eventFn = TestUtils.Simulate[mappedEvent];
              if (!eventFn) {
                throw new TypeError('ReactWrapper::simulate() event \'' + String(event) + '\' does not exist');
              }
              // eslint-disable-next-line react/no-find-dom-node
              eventFn(_react2['default'].findDOMNode(node.instance), mock);
            }

            return simulateEvent;
          }(),
          batchedUpdates: function () {
            function batchedUpdates(fn) {
              return _batchedUpdates(fn);
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
        var renderer = _createShallowRenderer();
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
                // return withSetStateAllowed(() => renderer.render(el, context));
                return renderer.render(el, context);
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
                return (0, _ReactThirteenElementToTree2['default'])(cachedNode);
              }
              var output = renderer.getRenderOutput();
              return {
                nodeType: 'class',
                type: cachedNode.type,
                props: cachedNode.props,
                key: cachedNode.key,
                ref: cachedNode.ref,
                instance: renderer._instance._instance,
                rendered: (0, _ReactThirteenElementToTree2['default'])(output)
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
                  _batchedUpdates(function () {
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
                return _batchedUpdates(fn);
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
              return _react2['default'].renderToStaticMarkup(el);
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
        return (0, _ReactThirteenElementToTree2['default'])(element);
      }

      return elementToNode;
    }()
  }, {
    key: 'nodeToHostNode',
    value: function () {
      function nodeToHostNode(node) {
        return _react2['default'].findDOMNode(node.instance);
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

  return ReactThirteenAdapter;
}(_enzyme.EnzymeAdapter);

module.exports = ReactThirteenAdapter;