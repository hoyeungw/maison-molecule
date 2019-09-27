'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class JsonFab {
  static hardByParse(dict) {
    const shallowObject = JsonFab.shallowByCreate(dict);
    return JSON.parse(JSON.stringify(shallowObject));
  }

  static hardTest(target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }

  static hardByCreate(obj) {
    let clone = {};

    for (let i in obj) {
      if (obj[i] != null && typeof obj[i] == 'object') clone[i] = JsonFab.hardByCreate(obj[i]);else clone[i] = obj[i];
    }

    return clone;
  }

  static shallowByAssign(dict) {
    const shallowObject = JsonFab.shallowByCreate(dict);
    return Object.assign({}, shallowObject);
  }

  static shallowByCreate(dict) {
    let o = {};

    for (let [k, v] of dict) {
      o[k] = v;
    }

    return o;
  }

  static shallowBySpread(dict) {
    return { ...[...dict.entries()]
    };
  }

  static shallowByEntries(...entries) {
    return { ...entries
    };
  }

}

class KeysIterator {
  static indexesByObject(arr) {
    return !!arr ? Object.keys(arr) : [];
  }

  static indexesByPrototype(arr) {
    return !!arr ? [...arr.keys()] : [];
  }

}

exports.JsonFab = JsonFab;
exports.KeysIterator = KeysIterator;
