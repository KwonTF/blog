import webpack, {Configuration} from 'webpack'
import koaWebpack from 'koa-webpack'
import {Middleware} from 'koa'

type buildAppArgs = {
	clientConfig: Configuration
}

let clientMiddleWare: Middleware
export default async function buildApp({clientConfig}: buildAppArgs): Promise<Middleware> {
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
