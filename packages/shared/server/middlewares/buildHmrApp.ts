import path from 'path'
import {Middleware} from 'koa'
import webpack, {Configuration} from 'webpack'
import koaWebpack from 'koa-webpack'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'

type buildAppArgs = {
  clientConfig: Configuration
  ssrServerConfig: Configuration
}

let clientMiddleWare: Middleware
export default async function buildHmrApp({clientConfig, ssrServerConfig}: buildAppArgs): Promise<Middleware[]> {
  let serverModule, serverMiddleware
  const clientCompiler = webpack(clientConfig)
  const serverCompiler = webpack(ssrServerConfig)

  clientMiddleWare = await koaWebpack({
    compiler: clientCompiler,
    devMiddleware: {
      publicPath: clientConfig.output.publicPath as string,
      stats: {
        colors: true
      }
    }
  })

  function passBundles() {
    if (serverModule) {
      serverModule.default().then((middleware) => {
        serverMiddleware = middleware
      })
    }
  }

  function localWebpackMiddleware(ctx, next) {
    if (serverMiddleware) {
      return serverMiddleware(ctx, next)
    }
    return next()
  }

  serverCompiler.hooks.done.tap('serverBundle', (serverStats) => {
    try {
      const {compilation} = serverStats
      const {path: outputPath} = compilation.outputOptions
      const filename = Object.keys(compilation.assets).find((key) => /.js$/i.test(key) && key.startsWith('index'))
      const serverOutputPath = path.join(outputPath, filename)

      serverModule = require(serverOutputPath)
      passBundles()
    } catch (e) {
      return
    }
  })
  return [clientMiddleWare, webpackHotMiddleware(clientCompiler), localWebpackMiddleware]
}
