import buildApp from '@blog/shared/server/middlewares/buildApp'
import createServer from '@blog/shared-server/createServer'

import clientWebpackConfig from '@blog/admin/webpack.client.config'

async function startServer() {
	const koaAppMiddleware = await buildApp({clientConfig: await clientWebpackConfig})
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
