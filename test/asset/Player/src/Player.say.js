import { Player } from './Player'
import { Zu } from 'borel'

class S {

}

export default Player.prototype.say = function () {
  const rand = Zu.rand(0, 10)
  return `${this.name}: ${'Hi!'.repeat(rand)}`
}


