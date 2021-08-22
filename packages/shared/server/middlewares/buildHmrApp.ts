import path from 'path'
import {Middleware} from 'koa'
import webpack, {Configuration, Stats} from 'webpack'
import koaWebpack from 'koa-webpack'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'

type buildAppArgs = {
  clientConfig: Configuration
  ssrServerConfig: Configuration
}

let clientDevMiddleWare
let serverDevMiddleWare
let serverModule, serverMiddleware

function passSSRServerBundle(serverStats: Stats): void {
  try {
    const {compilation} = serverStats
    const {path: outputPath} = compilation.outputOptions
    const filename = Object.keys(compilation.assets).find((key) => /.js$/i.test(key) && key.startsWith('index'))
    const serverOutputPath = path.join(outputPath, filename)

    serverModule = require(serverOutputPath)
    if (serverModule) {
      serverModule.default().then((middleware) => {
        serverMiddleware = middleware
      })
    }
  } catch (e) {
    return
  }
}

export default async function buildHmrApp({clientConfig, ssrServerConfig}: buildAppArgs): Promise<Middleware[]> {
  const clientCompiler = webpack(clientConfig)
  const serverCompiler = webpack(ssrServerConfig)

  // Compile Client Code
  clientDevMiddleWare = await koaWebpack({
    compiler: clientCompiler,
    devMiddleware: {
      publicPath: clientConfig.output.publicPath,
      stats: {
        colors: true
      }
    }
  })

  // Compile SSR Server
  serverDevMiddleWare = await koaWebpack({
    compiler: serverCompiler,
    devMiddleware: {
      publicPath: ssrServerConfig.output.path,
      stats: {colors: true}
    }
  })

  const localWebpackMiddleware = (ctx, next) => {
    if (serverMiddleware) {
      return serverMiddleware(ctx, next)
    }
    return next()
  }

  serverCompiler.hooks.done.tap('serverBundle', passSSRServerBundle)
  return [clientDevMiddleWare, webpackHotMiddleware(clientCompiler), localWebpackMiddleware]
}

export function devMiddlewareCleanup(): void {
  if (clientDevMiddleWare?.close) clientDevMiddleWare.close()
  if (serverDevMiddleWare?.close) serverDevMiddleWare.close()
}
