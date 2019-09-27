import { Player } from '../../asset/Player'
import { GP } from 'elprimero'

export class ImportLoadingTest {
  static test () {
    GP.now() |> console.log
    Object.getOwnPropertyNames(Player.prototype) |> console.log

    import('../../asset/Player')
      .then((module) => {
        GP.now() |> console.log
        Object.getOwnPropertyNames(Player.prototype) |> console.log
      })
  }
}

//
// compareShallowCopy('compareShallowCopy import', () => {
//   ImportLoadingTest.compareShallowCopy()
// })