import path from 'path'

import buildHmrApp, {devMiddlewareCleanup} from '@blog/shared/server/middlewares/buildHmrApp'
import createServer from '@blog/shared-server/createServer'
import {getSSRServerWebpackConfig} from '@blog/shared/webpack/config/ssr.config'

import clientWebpackConfig from '@blog/admin/webpack.client.config'
import {root} from '@blog/admin/config/paths'

const context = root
const ssrServerConfig = getSSRServerWebpackConfig({
  context,
  isLocal: true,
  tsConfigPath: 'tsconfig.json',
  entry: [path.join(context, 'src/server/ssrMiddlewares/dev.ts')]
})

async function startServer() {
  const koaAppMiddleware = await buildHmrApp({clientConfig: clientWebpackConfig, ssrServerConfig: ssrServerConfig})

  const server = await createServer({
    port: 7650,
    shutdownJobs: [devMiddlewareCleanup],
    middlewares: koaAppMiddleware
  })
  server.start()
}

startServer()
