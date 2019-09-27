import { Chrono } from 'elprimero'
import { CrosTabExt } from '../../misc/CrosTab.unshiftAverageRow'
import { deco, VecX } from 'xbrief'
import { Jso } from 'veho'
import { CrosTab } from 'crostab'

const arr = [1, 2, 3]
const set = new Set(arr)
let [singer, writer, journalist] = ['Swift', 'Sorkin', 'Wintour']
const objectList = {
  numbers: arr,
  miscs: [null, , NaN],
  chiefs: [singer, writer, journalist],
  matrix: [arr, arr, arr],
  another: [set, [arr]]
}
const paramsList = Jso.of(...Object.entries(objectList).map(([k, v]) => [k, [v]]))

function changeToObjectList () {
  '  numbers'.tag('alter element at index 1 to: 4')  |> console.log
  objectList.numbers[1] = 4
  '  numbers'.tag('push element: 7') |> console.log
  objectList.numbers.push(7)
  '  set'.tag('add one element: 4') |> console.log
  set.add(4)
  '  writer'.tag('changed to: \'Tolstoy\'') |> console.log
  writer = 'Tolstoy'
  '  chiefs'.tag('shift one element') |> console.log
  objectList.chiefs.shift()
}

class CopyArraySpeedTest {
  static createArrayOfCertainLength () {
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 60000,
      paramsList: {
        n0: [0, 1],
        n1: [1, 'Shakespeare'],
        n8: [8, '!'],
        n24: [24, null],
        n64: [64, null],
        n128: [128, null],
        n256: [256, null],
        n512: [512, null],
        n1024: [1024, null],
        // tenThousand: [10000, null],
        // fiftyThousand: [50000, null]
      },
      funcList: {
        benchMark: (cn, el) => {return Array(cn)},
        fastest: (cn, el) => {
          if (cn <= 128) {
            let arr = []
            for (let i = 0; i < cn; i++) arr[i] = el
            return arr
          } else {
            return Array(cn).fill(el)
          }
        },
        forLoop_push: (cn, el) => {
          let arr = []
          for (let i = 0; i < cn; i++) arr.push(el)
          return arr
        },
        forLoop_index: (cn, el) => {
          let arr = []
          for (let i = 0; i < cn; i++) arr[i] = el
          return arr
        },
        forLoop_index_b: (cn, el) => {
          let arr = Array(cn)
          for (let i = 0; i < cn; i++) arr[i] = el
          return arr
        },
        whileLoop_push: (cn, el) => {
          let [arr, i] = [[], cn]
          while (i--) arr.push(el)
          return arr
        },
        newArray_fill: (cn, el) => Array(cn).fill(el), //.map((u, i) => i),
        newArray_map: (cn, el) => Array(cn).map(_ => el), //.map((u, i) => i),
        newArray_spread_map: (cn, el) => [...Array(cn)].map(_ => el),
        arrayApply_map: (cn, el) => Array.apply(null, Array(cn)).map(_ => el),
        // arrayFrom: (cn, el) => Array.from({ length: cn }, _ => el),
        // arrayFrom_map: (cn, el) => Array.from({ length: cn }).map(_ => el),
      }
    });
    (lapse |>  CrosTabExt.unshiftAverage).brief() |> console.log
    result.unshiftRow('can iterate', result.row('n24').map(arr => {
      try {
        const keys = []
        for (let i = 0, l = arr.length; i < l; i++) {
          keys[i] = i
        }
        return keys
      } catch (e) {
        return e.name
      }
    })).unshiftRow('can iterate 2', result.row('n24').map(arr => {
      try {
        return [...arr.keys()]
      } catch (e) {
        return e.name
      }
    })).brief({ abstract: arr => VecX.hBrief(arr, { delimiter: ',', head: 3, tail: 1 }) }) |> console.log

    // const resultAnalyst = CrosTab.from({
    //   side: 'can shift',
    //   banner: result.banner
    // })

  }

  static compareShallowCopy () {
    const additional = {
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
    }
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 80000,
      paramsList: {
        ...additional,
        //...paramsList
      },
      funcList: {
        benchMark: (arr) => {return Array(arr.length)},
        fast_custom: (arr) => {
          const l = arr.length
          if (l < 128) {
            return arr.map(x => x)
          } else {
            const x = Array(l)
            for (let i = 0; i < l; i++) x[i] = arr[i]
            return x
          }
        },
        forLoop_push: (arr) => {
          const x = []
          for (let i = 0, l = arr.length; i < l; i++) x.push(arr[i])
          return x
        },
        forOfLoop_push: (arr) => {
          const x = []
          for (let el of arr) {x.push(el)}
          return x
        },
        forLoop_index: (arr) => {
          const x = []
          for (let i = 0, l = arr.length; i < l; i++) x[i] = arr[i]
          return x
        },
        forLoop_index_b: (arr) => {
          const l = arr.length
          const x = Array(l)
          for (let i = 0; i < l; i++) x[i] = arr[i]
          return x
        },
        map: (arr) => arr.map(it => it),
        arrayFrom: (arr) => Array.from(arr),
        spread: (arr) => [...arr],
        concat: (arr) => [].concat(arr),
        slice: (arr) => arr.slice(),
      }
    });
    (lapse |>  CrosTabExt.unshiftAverage).brief() |> console.log
    changeToObjectList()
    result
      .unshiftCol('original', Object.values(objectList))
      .unshiftRow('length', result.row('n4').map(it => [it.length]))
      .brief({ abstract: arr => VecX.hBrief(arr, { delimiter: ',', head: 2, tail: 1 }) }) |> console.log
  }

  static checkShallowCopy () {
    'original [objectList]' |> console.log
    objectList |> deco |> console.log

    'forLoopPush [objectList], each of its value is shallow copied into a new object' |> console.log
    const newList = Jso.fromEntries(Object.entries(objectList), arr => arr.slice())

    changeToObjectList()

    'and re-check [objectList]' |> console.log
    objectList |> deco |> console.log

    '[newList]' |> console.log
    newList |> deco |> console.log

  }
}

test('Copy array speed inferTypes: create array of certain length', () => {
  CopyArraySpeedTest.createArrayOfCertainLength()
})
test('Copy array speed inferTypes: compare shallow copy', () => {
  CopyArraySpeedTest.compareShallowCopy()
})
test('Copy array speed inferTypes: check shallow copy', () => {
  CopyArraySpeedTest.checkShallowCopy()
})