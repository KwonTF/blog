// Webpack Typescript Guide
// https://webpack.js.org/configuration/configuration-languages/
import path from 'path'
import {Configuration} from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {getBabelPresetEnv} from './util'
export type GetBaseConfigArgs = {
  tsConfigPath: string
  isClient?: boolean
}

export function getBaseWebpackConfig({tsConfigPath, isClient}: GetBaseConfigArgs): Configuration {
  return {
    entry: './src/index.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
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
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [getBabelPresetEnv({isClient}), '@babel/preset-react', '@babel/preset-typescript']
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
    }
  }
}
