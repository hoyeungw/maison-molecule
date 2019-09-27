import config from '../rollup.config'
import { BabelLocal } from './BabelLocal'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

const [configUMD, configCJS, configESM] = config
const external = ['xbrief']

configUMD.plugins = [
  resolve(),
  babel({
    ...BabelLocal.base,
    presets: BabelLocal.presets,
    plugins: BabelLocal.plugins
  }),
  commonjs()
]

configCJS.external = external
configCJS.plugins = [
  babel({
    ...BabelLocal.base,
    presets: BabelLocal.presets,
    plugins: BabelLocal.plugins
  }),
]

configESM.external = external
configESM.plugins = [
  babel({
    ...BabelLocal.base,
    plugins: BabelLocal.plugins
  }),
]

module.exports = [configUMD, configCJS, configESM]