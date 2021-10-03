// Webpack Typescript Guide
// https://webpack.js.org/configuration/configuration-languages/
import {Configuration} from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {getBabelPresetEnv} from './util'
export type GetBaseWebpackConfigArgs = {
  tsConfigPath: string
  isClient?: boolean
}

function getBaseWebpackConfig({tsConfigPath, isClient}: GetBaseWebpackConfigArgs): Configuration {
  const config: Configuration = {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: 'babel-loader',
          options: {
            presets: [getBabelPresetEnv({isClient}), '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-proposal-class-properties']
          },
          exclude: function (requrirePath) {
            if (requrirePath.match(/node_modules/)) return true
            return false
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    resolve: {extensions: ['.tsx', '.ts', '.mjs', '.js', '.json']},
    optimization: {
      usedExports: true
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: tsConfigPath
        }
      })
    ]
  }

  return config
}

export {getBaseWebpackConfig}
