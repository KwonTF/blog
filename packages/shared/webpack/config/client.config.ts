import path from 'path'
import {Configuration} from 'webpack'
import {merge} from 'webpack-merge'

import {DictType} from '@blog/shared/types'
import {getBaseWebpackConfig} from '@blog/shared-webpack/config/base.config'

type GetClientConfigArgs = {
  packagePath: string
  entries: DictType<string[]>
  assetsPrefix: string
  isDev?: boolean
}

export function getClientWebpackConfig({packagePath, entries, assetsPrefix, isDev}: GetClientConfigArgs): Configuration {
  const output = path.join(packagePath, './dist')
  const baseConfig = getBaseWebpackConfig({tsConfigPath: path.join(packagePath, 'tsconfig.json')})
  return merge(baseConfig, {
    mode: 'development',
    context: packagePath,
    entry: {...entries, vendor: ['react', 'react-dom']},
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
