import path from 'path'

import buildHmrApp from '@blog/shared/server/middlewares/buildHmrApp'
import createServer from '@blog/shared-server/createServer'
import getSSRServerWebpackConfig from '@blog/shared/webpack/config/ssrServer.config'

import clientWebpackConfig from '@blog/admin/webpack.client.config'

const context = path.normalize(`${__dirname}/..`)
const ssrServerConfig = getSSRServerWebpackConfig({
  context,
  isLocal: true,
  tsConfigPath: 'tsconfig.json',
  entry: [path.join(context, 'src/server/middlewares/local.ts')]
})
async function startServer() {
  const koaAppMiddleware = await buildHmrApp({clientConfig: clientWebpackConfig, ssrServerConfig: ssrServerConfig})
  const server = await createServer({
    port: 7650,
    middlewares: [koaAppMiddleware],
    config: {
      // TODO: Apply Domain
      baseUrl: 'simpleURL',
      corsOrigins: ['simpleURL', 'sampleURL']
    }
  })
  server.start()
}

startServer()
