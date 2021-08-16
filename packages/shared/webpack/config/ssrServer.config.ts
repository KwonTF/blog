import path from 'path'
import {Configuration} from 'webpack'
import merge from 'webpack-merge'

import {GetBaseConfigArgs, getBaseWebpackConfig} from '@blog/shared/webpack/config/base.config'

type GetServerWebpackConfigArgs = {
  entry?: string[]
  isLocal?: boolean
  context?: string
} & GetBaseConfigArgs

export default function getSSRServerWebpackConfig({context, entry, isLocal, tsConfigPath}: GetServerWebpackConfigArgs): Configuration {
  const baseConfig = getBaseWebpackConfig({tsConfigPath: path.join(context, tsConfigPath || 'tsconfig.server.json')})
  return merge(baseConfig, {
    context,
    mode: 'development',
    entry: entry || ['./src/server/index.ts'],
    target: 'node',
    output: {
      path: path.join(context, 'dist'),
      libraryTarget: 'commonjs'
    },
    // Polyfil dir, filename for node enviorment
    node: {
      __dirname: true,
      __filename: true
    }
  })
}
