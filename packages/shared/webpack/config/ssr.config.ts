import {Configuration} from 'webpack'
import {merge} from 'webpack-merge'

import {getHtmlWebpackConfig} from './html.config'
import {GetBaseWebpackConfigArgs} from './base.config'
import {getServerWebpackConfig, GetServerWebpackConfigArgs} from './server.config'

type GetSSRServerConfigArgs = GetBaseWebpackConfigArgs & GetServerWebpackConfigArgs

export function getSSRServerWebpackConfig(configs: GetSSRServerConfigArgs): Configuration {
  const webpackConfigs = {...configs, isClient: true}
  const clientConfig = getHtmlWebpackConfig(webpackConfigs)
  const serverConfig = getServerWebpackConfig(webpackConfigs)

  return merge(clientConfig, serverConfig)
}
