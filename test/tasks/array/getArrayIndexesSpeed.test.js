import { clone } from '../copyMethods/functions/deepCloneAlpha'
import { Chrono } from 'elprimero'
import { omniObjectParams } from '../../asset/omniObjects'
import { CrosTabExt } from '../../misc/CrosTab.unshiftAverageRow'
import { Dic } from 'veho'
import { VecX } from 'xbrief'

class GetArrayIndexesSpeedTest {
  static test () {
    const { lapse, result } = Chrono.crossByParamAndFuncs(
      {
        repeat: 100000,
        paramsList: {
          n4: [Array(4).fill(null).map((_, i) => i)],
          n8: [Array(8).fill(null).map((_, i) => i)],
          n16: [Array(16).fill(null).map((_, i) => i)],
          n32: [Array(32).fill(null).map((_, i) => i)],
          n48: [Array(48).fill(null).map((_, i) => i)],
          n64: [Array(64).fill(null).map((_, i) => i)],
          n128: [Array(128).fill(null).map((_, i) => i)],
          n256: [Array(256).fill(null).map((_, i) => i)],
          n512: [Array(512).fill(null).map((_, i) => i)],
          n1024: [Array(1024).fill(null).map((_, i) => i)],
        },
        funcList: {
          direct_map: arr => arr.map((_, i) => i),
          Array_map: arr => Array(arr.length).map((_, i) => i),
          spread_keys: arr => [...arr.keys()]
        }
      }
    )
    'lapse' |> console.log;
    (CrosTabExt.unshiftAverage(lapse)).brief() |> console.log
    'result' |> console.log
    result.brief({ abstract: arr => VecX.hBrief(arr, { delimiter: ',', head: 2, tail: 1 }) }) |> console.log

  }
}

test('GetArrayIndexesSpeedTest inferTypes', () => {
  GetArrayIndexesSpeedTest.test()
})