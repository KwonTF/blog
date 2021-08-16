import webpack, {Configuration} from 'webpack'
import koaWebpack from 'koa-webpack'
import {Middleware} from 'koa'

type buildAppArgs = {
  clientConfig: Configuration
  ssrServerConfig: Configuration
}

let clientMiddleWare: Middleware
export default async function buildHmrApp({clientConfig, ssrServerConfig}: buildAppArgs): Promise<Middleware> {
  const clientCompiler = webpack(clientConfig)
  clientMiddleWare = await koaWebpack({
    compiler: clientCompiler,
    devMiddleware: {
      publicPath: clientConfig.output.publicPath as string,
      stats: {
        colors: true
      }
    }
  })

  return clientMiddleWare
}
