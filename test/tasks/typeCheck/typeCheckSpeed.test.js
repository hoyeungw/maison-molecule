import { Chrono } from 'elprimero'
import { omniObjectParams } from '../../asset/omniObjects'
import { Fun, Mat } from 'veho'
import { Stat } from 'borel'
import { Typ } from 'xbrief'
import { cloneArray, cloneObject } from '../copyMethods/functions/deepCloneAlpha'

const rxObj = /^\[object (.*)]$/
const oc = Object.prototype.toString

class Typ0 {
  static inferType (o) {
    const raw = typeof o
    return raw === 'object'
      ? Typ0.objectType(o)
      : raw
  }

  static objectType (o) {
    const [, info] = Object.prototype.toString.call(o).match(rxObj)
    return info.toLowerCase()
    // return str.match(rxObj)[1].toLowerCase()
  }
}

class TypeCheckSpeedTest {
  static inferTypes () {
    const { lapse, result } = Chrono.crossByParamAndFuncs(
      {
        repeat: 500000,
        paramsList: omniObjectParams,
        funcList: {
          std_typeof: o => typeof o,
          Typ_infer: o => Typ.infer(o),
          Typ0_infer: o => Typ.infer(o),
          Object_proto: o => Object.prototype.toString.call(o),
          custom_proto: o => oc.call(o),
          refConstructor: o => !!o ? o.constructor === Array : false,
          instanceOf: o => o instanceof Array,
          Array_isArray: o => Array.isArray(o)
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

  static iterateTypes () {
    const typSet = ['obj', 'fun']
    const { lapse, result } = Chrono.crossByParamAndFuncs(
      {
        repeat: 500000,
        paramsList: omniObjectParams,
        funcList: {
          benchmark: (o) => (typeof o).slice(0, 3).toUpperCase(),
          std_iterate: (o) => {
            if (!o || typeof o != 'object') return (typeof o).slice(0, 3).toUpperCase()
            switch (true) {
              case o instanceof Array :
                return 'ARR'
              case o instanceof Date :
                return 'DAT'
              case o instanceof Map:
                return 'MAP'
              case o instanceof Set:
                return 'SET'
              case o instanceof Function :
                return 'FUN'
              case o instanceof Object :
                return 'OBJ'
            }
            throw new Error('Unable to copy obj. Unsupported type.')
          },
          new_iterate: (o) => {
            const t = (typeof o).slice(0, 3)
            if (!o || t !== 'obj' || t !== 'fun') return (typeof o).slice(0, 3).toUpperCase()
            const typ = oc.call(o).slice(8, 11)
            switch (typ) {
              case 'Arr':
                return 'ARR'
              case 'Obj' :
                return 'OBJ'
              case 'Map':
                return 'MAP'
              case 'Dat' :
                return 'DAT'
              case 'Fun' :
                return 'FUN'
              case 'Set':
                return 'SET'
              default:
                return 'UNKNOWN'
            }
          },
          new_iterate_b: (o) => {
            const typ = oc.call(o).slice(8, 11)
            switch (typ) {
              case 'Arr':
                return 'ARR'
              case 'Obj' :
                return 'OBJ'
              case 'Map':
                return 'MAP'
              case 'Dat' :
                return 'DAT'
              case 'Fun' :
                return 'FUN'
              case 'Set':
                return 'SET'
              default:
                return typ.toUpperCase()
            }
          },
          multi_crit_a: (o) => {
            const t = (typeof o).slice(0, 3)
            if (!o || (t !== 'obj' && t !== 'fun')) return t
            else return t.toUpperCase()
          },
          multi_crit_b: (o) => {
            const t = (typeof o).slice(0, 3)
            if (!o || !typSet.includes(t)) return t
            else return t.toUpperCase()
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

test('TypeCheckArraySpeedTest inferTypes', () => {
  TypeCheckSpeedTest.inferTypes()
})

test('TypeCheckArraySpeedTest iterateTypes', () => {
  TypeCheckSpeedTest.iterateTypes()
})

export { TypeCheckSpeedTest }