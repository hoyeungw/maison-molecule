/**
 *
 * @param {*} node
 * @param {boolean} typed
 * @return {*}
 */
function clone (node, typed = false) {
  if (!node || typeof node != 'object') return node
  switch (true) {
    case Array.isArray(node) :
      return typed ? cloneTyped(node) : cloneArray(node)
    case node instanceof Date :
      return new Date(+node) // new Date(node.valueOf()) //new Date(+node);
    case node instanceof Map:
      return new Map(Array.from(node.entries(), ([k, v]) => [k, clone(v)]))
    case node instanceof Set:
      return new Set(cloneArray([...node]))
    case node instanceof Object :
      return cloneObject(node)
  }
  throw new Error('Unable to copy obj. Unsupported type.')
}

function cloneTyped (node) {
  if (node.length) {
    const one = node[0]
    return !one || typeof one != 'object'
      ? node.slice()
      : node.map(ar => clone(ar, true))
  } else {
    return []
  }
}

function cloneArray (node) {
  return node.map(clone)
}

/**
 * Known issue:
 * Unable to clone circular and nested object.
 * @param {{}} node
 * @return {{}}
 */
function cloneObject (node) {
  const x = {}
  for (let [k, v] of Object.entries(node)) x[k] = clone(v)
  return x
}

export {
  clone as cloneAlpha,
  cloneArray,
  cloneObject
}

// ini array 1
// x = []
// forLoopPush (let i = 0, len = node.length; i < len; i++) {
//   x[i] = clone(node[i])
// }
// return x

// ini array 2
// return Array.from(node, (v) => clone(v))