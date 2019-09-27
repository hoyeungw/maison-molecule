import { Chrono } from 'elprimero'
import { omniObjectParams } from '../../asset/omniObjects'
import { Jso, Mat } from 'veho'
import { Stat } from 'borel'

const rxObj = /^\[object (.*)]$/
const oc = Object.prototype.toString

function otype (o) {return oc.call(o)}

class SubstringSpeedTest {
  static test () {
    const { lapse, result } = Chrono.crossByParamAndFuncs(
      {
        repeat: 500000,
        paramsList: Jso.fromEntries(Object.entries(omniObjectParams), ([v]) => [otype(v)]),
        funcList: {
          cut_regex: tx => {
            const [, info] = tx.match(rxObj)
            return '.' + info
          },
          cut_regex_2: tx => tx.match(rxObj)[1].toLowerCase(),
          cut_substring: tx => '.' + tx.substring(8, tx.length - 1),
          cut_slice: tx => '.' + tx.slice(8, -1),
          lower_toLower: tx => tx.substring(8, tx.length - 1).toLowerCase(),
          lower_toLower2: tx => {
            const t = tx.substring(8, tx.length - 1)
            return t[0].toLowerCase() + t.substring(1)
          }

        }
      }
    )
    'lapse' |> console.log
    lapse
      .unshiftRow('[average]', Mat.vehoCol(lapse.matrix, Stat.avg).map(n => n.toFixed(0)))
      .brief() |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

test('substring speed inferTypes: inferTypes', () => {
  SubstringSpeedTest.test()
})