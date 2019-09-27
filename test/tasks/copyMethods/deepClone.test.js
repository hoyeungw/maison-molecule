import { Chrono } from 'elprimero'
import { omniObjectParams } from '../../asset/omniObjects'
import { Dic, Mat } from 'veho'
import { MatX } from 'xbrief'
import { cloneAlpha } from './functions/deepCloneAlpha'
import { cloneBeta } from './functions/deepCloneBeta'
import { CrosTabExt } from '../../misc/CrosTab.unshiftAverageRow'
import { nba_players_performance } from '../../asset/cax/nba.players.perfrormance'

class DeepCloneTest {
  static funcList = {
    benchmark: it => it.slice(),
    std_deep_clone: it => JSON.parse(JSON.stringify(it)),
    // std_deep_clone: it => {try {return JSON.parse(JSON.stringify(it))} catch (e) {return e}},
    deep_typed_copy: it => cloneAlpha(it, true),
    deep_copy_alpha: it => cloneAlpha(it, false),
    deep_copy_beta: it => cloneBeta(it)
  }

  static test () {
    const { lapse, result } = Chrono.crossByParamAndFuncs(
      {
        repeat: 100000,
        paramsList: omniObjectParams,
        funcList: DeepCloneTest.funcList
      }
    )
    'lapse' |> console.log;
    (CrosTabExt.unshiftAverage(lapse)).brief() |> console.log
    'result' |> console.log
    result.brief() |> console.log

    const r = Dic.ini(result.side, result.column('deep_copy'))
    r |> console.log
  }

  static testLargeMatrices () {
    const additionalParamsList = {
      nba_players_performance: [nba_players_performance.rows],
      mx_16_32: [Mat.ini(16, 32, (i, j) => i + j)],
      mx_32_16: [Mat.ini(32, 16, (i, j) => i + j)],
      mx_64_16: [Mat.ini(64, 16, (i, j) => i + j)],
      mx_2048_12: [Mat.ini(2048, 12, (i, j) => i + j)],
      mx_128_128: [Mat.ini(128, 128, (i, j) => i + j)]
    }
    const { lapse, result } = Chrono.crossByParamAndFuncs(
      {
        repeat: 512,
        paramsList: additionalParamsList,
        funcList: DeepCloneTest.funcList
      }
    )
    'lapse' |> console.log;
    (lapse |> CrosTabExt.unshiftAverage).brief() |> console.log

    'deep_copy result' |> console.log
    const result1 = Dic.ini(result.side, result.column('std_deep_clone'))
    for (let [k, obj] of result1.entries()) {
      k |> console.log
      MatX.xBrief(obj, { rows: { head: 2, tail: 1 }, columns: { head: 2, tail: 1 } }) |> console.log
    }

    'deep_typed_copy result' |> console.log
    const result2 = Dic.ini(result.side, result.column('deep_copy_beta'))
    for (let [k, obj] of result2.entries()) {
      k |> console.log
      MatX.xBrief(obj, { rows: { head: 2, tail: 1 }, columns: { head: 2, tail: 1 } }) |> console.log
    }

  }
}

// test('DeepCloneTest', () => {
//   DeepCloneTest.test()
// })
//
// test('testLargeMatrices', () => {
//   DeepCloneTest.testLargeMatrices()
// })

export { DeepCloneTest }

