import fs from 'fs'
import path from 'path'
import {Middleware} from 'koa'
import webpack, {Configuration} from 'webpack'
import koaWebpack from 'koa-webpack'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
// For Use Memory Filesystem to Use Hot Module Webpacked Component
import {ufs} from 'unionfs'
import join from 'memory-fs/lib/join'
import {patchRequire} from 'fs-monkey'
import {vol} from 'memfs'

import logger from '@blog/shared/utils/logger'
const memFs: any = vol
function useMemoryFileSystem() {
  memFs.join = join
  ufs.use(fs).use(memFs)
  patchRequire(ufs)
}

type buildAppArgs = {
  clientConfig: Configuration
  ssrServerConfig: Configuration
}

let clientDevMiddleWare
let serverDevMiddleWare

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
    },
    hotClient: false
  })

  useMemoryFileSystem()
  // Compile SSR Server
  serverDevMiddleWare = await koaWebpack({
    compiler: serverCompiler,
    devMiddleware: {
      fs: memFs,
      writeToDisk: process.platform === 'win32',
      publicPath: ssrServerConfig.output.path,
      stats: {colors: true}
    },
    hotClient: false
  })

  let serverModule, serverMiddleware

  function passBundles() {
    if (serverModule) {
      serverModule.default().then((middleware) => {
        serverMiddleware = middleware
      })
    }
  }

  const localWebpackMiddleware = (ctx, next) => {
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
      if (e) logger.error(e)
    }
  })
  return [clientDevMiddleWare, webpackHotMiddleware(clientCompiler), localWebpackMiddleware]
}

export async function devMiddlewareCleanup() {
  if (clientDevMiddleWare?.close) clientDevMiddleWare.close()
  if (serverDevMiddleWare?.close) serverDevMiddleWare.close()
}
