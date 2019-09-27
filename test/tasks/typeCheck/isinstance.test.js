import { MatX } from 'xbrief'
import { brentPrice } from '../../asset/econ/brentPrice'
import { omniObjectParams } from '../../asset/omniObjects'
import { Mat } from 'veho'
import { Stat } from 'borel'
import { Chrono } from 'elprimero'

const simple_array = Object.values(brentPrice).slice(0, 5)

export class InstanceOfTest {
  static test0 () {
    const head = ['Name', 'Array', 'Array', 'Set', 'Function', 'Object']
    const rows = Object.entries(omniObjectParams).map(([k, it]) => {
      return [
        k,
        !!it ? it.constructor === Array : false,
        it instanceof Array,
        it instanceof Set,
        it instanceof Function,
        it instanceof Object
      ]
    })
    // const table = new Table(head, rows, 'check instance')
    // table.brief().wL()
    head |> console.log
    rows |> MatX.xBrief |> console.log

  }

  static test () {
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 80000,
      paramsList: omniObjectParams,
      funcList: {
        isArray: it => Array.isArray(it),
        constIsArr: it => !!it ? it.constructor === Array : false,
        instDate: it => it instanceof Date,
        instArr: it => it instanceof Array,
        constIsMap: it => !!it ? it.constructor === Map : false,
        instMap: it => it instanceof Map,
        instSet: it => it instanceof Set,
        instFun: it => it instanceof Function,
        instObj: it => it instanceof Object
      }
    })
    lapse
      .unshiftRow('[average]', Mat.vehoCol(lapse.matrix, Stat.avg).map(n => n.toFixed(0)))
      .brief() |> console.log

    '' |> console.log

    result.brief() |> console.log
  }
}

test('isinstance compareShallowCopy', () => {
  InstanceOfTest.test()
})