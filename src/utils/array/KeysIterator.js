class KeysIterator {
  static indexesByObject (arr) {
    return !!arr ? Object.keys(arr) : []
  }

  static indexesByPrototype (arr) {
    return !!arr ? [...arr.keys()] : []
  }
}

export {
  KeysIterator
}