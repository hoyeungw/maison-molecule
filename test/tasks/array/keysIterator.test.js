import { KeysIterator } from '../../../dist/index.esm'
import { Typ } from 'xbrief'

class KeysIteratorTest {
  static test () {
    const candidates = [
      null,
      undefined,
      [],
      [[]],
      [,],
      [1, 2, , 4, 5],
      ['TSLA', 'MSFT', 'DUAVF', 'AMZN', 'RR.L']
    ]
    for (let [k, candidate] of candidates.entries()) {
      try {
        k.tag(candidate).wL()
        '  indexesByObject'.tag(KeysIterator.indexesByObject(candidate)).wL()
        '  indexesByPrototype'.tag(KeysIterator.indexesByPrototype(candidate)).wL()
        try {
          const first = KeysIterator.indexesByPrototype(candidate)[0]
          '    first element'.tag(first).tag(first|>Typ.infer).wL()
        } catch (e) {
          '    error'.tag(e.message).wL()
        }
      } catch (e) {
        '  error'.tag(e.message).wL()
      }

    }
  }
}

// compareShallowCopy('Keys iterator compareShallowCopy', () => {
//   KeysIteratorTest.compareShallowCopy()
// })

export {
  KeysIteratorTest
}