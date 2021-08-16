import path from 'path'
import {Configuration} from 'webpack'
import {merge} from 'webpack-merge'

import {DictType} from '@blog/shared/types'
import {getBaseWebpackConfig} from '@blog/shared-webpack/config/base.config'

type GetClientConfigArgs = {
  packagePath: string
  entries: DictType<string>
  assetsPrefix: string
  isDev?: boolean
}

export function getClientWebpackConfig({packagePath, entries, assetsPrefix, isDev}: GetClientConfigArgs): Configuration {
  const output = path.join(packagePath, './dist')
  const baseConfig = getBaseWebpackConfig({tsConfigPath: path.join(packagePath, 'tsconfig.json')})
  const entry = isDev
    ? Object.entries(entries).reduce((prev, [key, value]) => {
        const next = prev
        next[key] = [value]
        return next
      }, {})
    : entries
  return merge(baseConfig, {
    mode: 'development',
    context: packagePath,
    entry: entry,
    target: 'web',
    devtool: isDev ? 'cheap-module-source-map' : 'source-map',
    output: {
      filename: '[name].[hash].js',
      path: `${output}/assets/`,
      publicPath: assetsPrefix
    },
    plugins: [],
    optimization: {
      splitChunks: {
        minSize: 100000,
        cacheGroups: {
          modules: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all'
          }
        }
      }
    }
  })
}
