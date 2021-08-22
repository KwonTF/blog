import {Configuration} from 'webpack'
import {merge} from 'webpack-merge'

import {getBaseWebpackConfig, GetBaseWebpackConfigArgs} from './base.config'
export function getHtmlWebpackConfig(baseConfigArgs: GetBaseWebpackConfigArgs): Configuration {
  // TODO: StyleLoader Config and Svg LoaderConfig
  return merge(getBaseWebpackConfig({...baseConfigArgs, isClient: true}))
}
