import { newTechs } from './technology/newTechs'
import { Player } from './Player'
import { StrX } from 'xbrief'
import { diningBehavior } from './management/diningBehavior'
import { Mat, Jso } from 'veho'

const obj_sample = {
  'City': 'Tokyo',
  'Taste': 'Milky',
  'TopOfMind': 'Oreo',
  'Rate': 9.35
}

const omniObjects = {
  boolean: true,
  string: 'Shakespeare',
  number: 128,
  null: null,
  undefined: undefined,
  new_date: new Date(),
  new_techs_ar: newTechs,
  new_mx: [[]],
  one_row_mx: [newTechs],
  num_matrix: Mat.ini(3, 12, (x, y) => Math.sin(Math.PI * (x + 1) / (y + 1)).toFixed(2)),
  num_set: new Set([1, 1, 1, 2, 2, 3,]),
  foobar_map: new Map([['f', 1], ['b', 2], ['g', 3]]),
  dining: diningBehavior,
  mr_sample: obj_sample,
  p_class: Player,
  p_instance: new Player('Messi', '001'),
  lambda: (x) => `${x}`,
  func: StrX.wL,
}

const omniObjectParams = Jso.of(
  ...Object.entries(omniObjects).map(([k, v]) => [k, [v]])
)

export {
  omniObjects,
  omniObjectParams
}
