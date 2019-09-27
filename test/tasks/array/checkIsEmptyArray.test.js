import { CrosTab } from 'crostab'

test('Test empty array', () => {
  const objects = {
    null: null,
    undefined: undefined,
    empty_array: [],
    empty_matrix: [[]],
    simple_array: [1, 2, 3]
  }
  /**
   *
   * @type {*[][]}
   */
  const matrix = Object.values(objects).map(v => [
    Array.isArray(v), !!v, !!v && !!v.length
  ])
  const crosTab = CrosTab.from({
    side: [...Object.keys(objects)],
    banner: ['isArray', 'notNull', 'notEmpty'],
    matrix: matrix,
    title: 'value'
  })
  crosTab.brief() |> console.log
})