import { JsonFab } from '../../../src/utils/json/JsonFab'
import { deco, MapX, Typ } from 'xbrief'

const drunk = ['coke', 'sprite']
const eaten = {
  cake: 0
}
const roughlyNow = new Date()

const gtd = new Map([
  ['foo', 'bar'],
  ['baz', 23],
  ['eat', eaten],
  ['bev', drunk],
  ['now', roughlyNow]
])

class ShallowCopyTest {
  static test () {
    const name = 'getThingsDone'

    name.tag('original') |> console.log
    MapX.vBrief(gtd) |> console.log
    ''  |> console.log

    const jsonByHardParse = JsonFab.hardByParse(gtd)
    const jsonByAssign = JsonFab.shallowByAssign(gtd)
    const jsonByCreate = JsonFab.shallowByCreate(gtd)
    const jsonBySpread = JsonFab.shallowBySpread(gtd)
    const jsonByEntries = JsonFab.shallowByEntries(...gtd)

    eaten.cake = 1
    drunk[1] = 'maotai'

    'Json by Parse'.tag('hard')  |> console.log
    jsonByHardParse  |> console.log
    ''  |> console.log

    'Json by Assign'.tag('shallow')  |> console.log
    jsonByAssign  |> console.log
    ''  |> console.log

    'Json by Create'.tag('shallow') |> console.log
    jsonByCreate |> console.log
    ''  |> console.log

    'Json by Spread'.tag('shallow') |> console.log
    jsonBySpread |> console.log

    ''  |> console.log
    'Json by Entries'.tag('shallow') |> console.log
    jsonByEntries |> console.log
    ''  |> console.log

  }
}

export {
  ShallowCopyTest
}