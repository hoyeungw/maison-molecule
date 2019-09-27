import { deco, VecX } from 'xbrief'

function Circ () {
  this.me = this
}

function Nested (y) {
  this.y = y
}

let a = {
  x: 'a',
  // circ: new Circ(),
  nested: new Nested('a')
}

class DeepCopy {
  static cloneSO (o) {
    // Handle the 3 simple types, and null or undefined
    if (!o || typeof o != 'object') return o
    let x
    switch (true) {
      // Handle Array
      case Array.isArray(o) :
        x = []
        let i = 0, len = o.length
        for (; i < len; i++) {
          x[i] = DeepCopy.cloneSO(o[i])
        }
        return x
      // Handle Object
      case o instanceof Object :
        x = {}
        for (const attr in o) {
          if (o.hasOwnProperty(attr)) x[attr] = DeepCopy.cloneSO(o[attr])
        }
        return x
      // Handle Date
      case o instanceof Date :
        x = new Date()
        x.setTime(o.getTime())
        return x
    }
    throw new Error('Unable to copy obj! Its type isn\'t supported.')
  }
}

// let b = a
// let b = JSON.parse(JSON.stringify(a))
let b = DeepCopy.cloneSO(a)

b.x = 'b'
b.nested.y = 'b'

class CircularAndNestedCloneTest {
  static test () {
    // a |> deco |> console.log
    a |> console.log
    b |> console.log
  }
}

test('JsonFabCircularTest', () => {
  CircularAndNestedCloneTest.test()
})

export {
  CircularAndNestedCloneTest
}