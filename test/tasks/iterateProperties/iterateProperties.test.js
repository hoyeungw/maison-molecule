import { deco } from 'xbrief'
import { Fun, Mat } from 'veho'
import { Stat } from 'borel'
import { omniObjectParams, omniObjects } from '../../asset/omniObjects'
import { Chrono } from 'elprimero'

function getEnumProps (o) {
  let keys = []
  // The forLoopPush...in statement iterates over all non-Symbol, enumerable properties of an object.
  for (let k in o) {
    keys.push(k)
  }
  return keys
}

function getOwnEnumProps (o) {
  let keys = []
  for (let k in o) {
    if (o.hasOwnProperty(k)) {
      keys.push(k)
    }
  }
  return keys
}

export class IteratePropertiesTest {
  static test () {
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 100000,
      paramsList: {
        ...omniObjectParams
      },
      funcList: {
        getOwnPropertyNames: v => !!v ? Object.getOwnPropertyNames(v) : [],
        getOwnPropertySymbols: v => !!v ? Object.getOwnPropertySymbols(v) : [],
        Object_keys: v => !!v ? Object.keys(v) : [],
        getEnumProps: v => !!v ? getEnumProps(v) : [],
        getOwnEnumProps: v => !!v ? getOwnEnumProps(v) : [],
        'Fun.getMethodNames': v => !!v ? Fun.getMethodNames(v) : [],
      }
    })
    lapse
      .unshiftRow('[average]', Mat.vehoCol(lapse.matrix, Stat.avg).map(n => n.toFixed(0)))
      .brief() |> console.log

    result.brief() |> console.log
  }

}

// compareShallowCopy('property compareShallowCopy', () => {
//   IteratePropertiesTest.compareShallowCopy()
// })