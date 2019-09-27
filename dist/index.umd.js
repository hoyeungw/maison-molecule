(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['maison-molecule'] = {}));
}(this, function (exports) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var JsonFab =
  /*#__PURE__*/
  function () {
    function JsonFab() {}

    JsonFab.hardByParse = function hardByParse(dict) {
      var shallowObject = JsonFab.shallowByCreate(dict);
      return JSON.parse(JSON.stringify(shallowObject));
    };

    JsonFab.hardTest = function hardTest(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    JsonFab.hardByCreate = function hardByCreate(obj) {
      var clone = {};

      for (var i in obj) {
        if (obj[i] != null && typeof obj[i] == 'object') clone[i] = JsonFab.hardByCreate(obj[i]);else clone[i] = obj[i];
      }

      return clone;
    };

    JsonFab.shallowByAssign = function shallowByAssign(dict) {
      var shallowObject = JsonFab.shallowByCreate(dict);
      return Object.assign({}, shallowObject);
    };

    JsonFab.shallowByCreate = function shallowByCreate(dict) {
      var o = {};

      for (var _iterator = dict, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _ref2 = _ref,
            k = _ref2[0],
            v = _ref2[1];
        o[k] = v;
      }

      return o;
    };

    JsonFab.shallowBySpread = function shallowBySpread(dict) {
      return _extends({}, [].concat(dict.entries()));
    };

    JsonFab.shallowByEntries = function shallowByEntries() {
      for (var _len = arguments.length, entries = new Array(_len), _key = 0; _key < _len; _key++) {
        entries[_key] = arguments[_key];
      }

      return _extends({}, entries);
    };

    return JsonFab;
  }();

  var KeysIterator =
  /*#__PURE__*/
  function () {
    function KeysIterator() {}

    KeysIterator.indexesByObject = function indexesByObject(arr) {
      return !!arr ? Object.keys(arr) : [];
    };

    KeysIterator.indexesByPrototype = function indexesByPrototype(arr) {
      return !!arr ? [].concat(arr.keys()) : [];
    };

    return KeysIterator;
  }();

  exports.JsonFab = JsonFab;
  exports.KeysIterator = KeysIterator;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
