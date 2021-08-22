import path from 'path'
import {Entry, EntryFunc, Configuration} from 'webpack'
import merge from 'webpack-merge'

import {getBaseWebpackConfig, GetBaseWebpackConfigArgs} from '@blog/shared-webpack/config/base.config'

export type GetServerWebpackConfigArgs = {
  context: string
  entry?: string | string[] | Entry | EntryFunc
  isLocal?: boolean
} & GetBaseWebpackConfigArgs

export function getServerWebpackConfig({context, entry, isLocal, tsConfigPath}: GetServerWebpackConfigArgs): Configuration {
  const baseConfig = getBaseWebpackConfig({tsConfigPath: path.join(context, tsConfigPath)})

  return merge(baseConfig, {
    context,
    mode: 'development',
    entry: entry,
    target: 'node',
    output: {
      path: path.join(context, 'dist'),
      filename: isLocal ? 'index.[hash].js' : 'index.js',
      libraryTarget: 'commonjs'
    },
    // @blog Code Make Like Library Codes.
    externals: [
      (_, request, cb) => {
        if (!request.match(/^@blog\//) && request.match(/^[@a-z][a-z/.\-0-9]*$/i)) {
          return cb(null, `commonjs ${request}`)
        }

        return cb()
      }
    ],
    node: {
      // Polyfil dir, filename for node enviorment
      __dirname: true,
      __filename: true
    }
  })
}
