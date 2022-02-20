import Path from 'path'
import RollupPluginBabel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import RollupPluginNodeResolve from '@rollup/plugin-node-resolve'
import RollupPluginTypescript from 'rollup-plugin-typescript2'
import RollupPluginDelete from 'rollup-plugin-delete'
import RollupPluginJson from '@rollup/plugin-json'
import RollupPluginCommonjs from '@rollup/plugin-commonjs'
import PackageJson from './package.json'

export default [
  {
    input: 'src/index.ts',
    external: Object.keys(PackageJson.dependencies || {}),
    plugins: [
      RollupPluginDelete({
        targets: Path.resolve(__dirname, 'dist/*'),
        watch: true
      }),
      RollupPluginNodeResolve(),
      RollupPluginCommonjs(),
      RollupPluginJson(),
      RollupPluginTypescript(),
      getBabelOutputPlugin({ configFile: Path.resolve(__dirname, 'babel.config.js') })
    ],
    output: {
      file: PackageJson.module
    }
  },
  {
    input: 'src/index.ts',
    plugins: [
      RollupPluginNodeResolve(),
      RollupPluginCommonjs(),
      RollupPluginJson(),
      RollupPluginTypescript(),
      RollupPluginBabel({
        babelHelpers: 'bundled'
      })
    ],
    output: {
      file: PackageJson.browser,
      format: 'iife',
      name: 'TwoDimensionContainer'
    }
  }
]
