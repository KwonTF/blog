import path from 'path'
import {Configuration, Entry} from 'webpack'
import {merge} from 'webpack-merge'

import {getHtmlWebpackConfig} from '@blog/shared-webpack/config/html.config'

type GetReactWebpackConfigArgs = {
  packagePath: string
  entries: Entry
  assetsPrefix: string
  isDev?: boolean
}

export function getReactWebpackConfig({packagePath, entries, assetsPrefix, isDev}: GetReactWebpackConfigArgs): Configuration {
  const output = path.join(packagePath, './dist')
  const htmlWebpackConfig = getHtmlWebpackConfig({tsConfigPath: path.join(packagePath, 'tsconfig.json')})

  return merge(htmlWebpackConfig, {
    mode: 'development',
    context: packagePath,
    entry: Object.keys(entries || {}).reduce(
      (prev, key) => {
        // eslint-disable-next-line no-param-reassign
        if (entries[key]) prev[key] = ['webpack-hot-middleware/client?timeout=2000', entries[key]].filter(Boolean)
        return prev
      },
      {
        vendor: ['react', 'react-dom']
      }
    ),
    target: 'web',
    devtool: isDev ? 'cheap-module-source-map' : 'source-map',
    output: {
      filename: '[name].[hash].js',
      path: `${output}/assets/`,
      publicPath: `${assetsPrefix}/`
    },
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
