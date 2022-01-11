import path from 'path'
import {Configuration, Entry, HotModuleReplacementPlugin} from 'webpack'
import {merge} from 'webpack-merge'
// for tracking hashed bundle location of each entries
import AssetsPlugin from 'assets-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'
// Make HMR without loosing state
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import {getHtmlWebpackConfig} from '@blog/shared-webpack/config/html.config'
import {addBabelPlugin} from '@blog/shared/webpack/utils/addBabelPlugin'

type GetReactWebpackConfigArgs = {
  packagePath: string
  entries: Entry
  assetsPrefix: string
  isDev?: boolean
}

export function getReactWebpackConfig({packagePath, entries, assetsPrefix, isDev}: GetReactWebpackConfigArgs): Configuration {
  const output = path.join(packagePath, './dist')
  const htmlWebpackConfig = getHtmlWebpackConfig({tsConfigPath: path.join(packagePath, 'tsconfig.json')})

  if (isDev) addBabelPlugin(htmlWebpackConfig, 'react-refresh/babel')
  addBabelPlugin(htmlWebpackConfig, '@loadable/babel-plugin')

  return merge(htmlWebpackConfig, {
    mode: 'development',
    context: packagePath,
    entry: Object.keys(entries || {}).reduce(
      (prev, key) => {
        // eslint-disable-next-line no-param-reassign
        if (entries[key]) prev[key] = [`webpack-hot-middleware/client?timeout=2000`, entries[key]].filter(Boolean)
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
    plugins: [
      new AssetsPlugin({
        path: output,
        filename: 'assets.js'
      }),
      new LoadablePlugin({writeToDisk: true}),
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    optimization: {
      // NoEmitOnErrorsPlugin is Deprecated
      noEmitOnErrors: true,
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
