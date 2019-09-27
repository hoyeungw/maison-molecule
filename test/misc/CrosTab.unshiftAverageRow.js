import { Mat } from 'veho'
import { Stat } from 'borel'
import { CrosTab } from 'crostab'

class CrosTabExt {
  /**
   *
   * @param {CrosTab} crosTab
   * @return {CrosTab}
   */
  static unshiftAverage (crosTab) {
    const averages = Mat.vehoCol(crosTab.matrix, Stat.avg).map(n => n.toFixed(0))
    crosTab.unshiftRow('average', averages)
    return crosTab
  }
}

export {
  CrosTabExt
}