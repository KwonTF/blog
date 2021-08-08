/* eslint-disable no-param-reassign */
import Koa, {Middleware} from 'koa'
import compress from 'koa-compress'
// import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import {AsyncFunction} from '@blog/shared/types'
import xssCheck from '@blog/shared/server/middlewares/xssCheck'

type Config = Record<string, any> & {
	baseUrl: string
	corsOrigins: string[]
}

type CreateServerOption = {
	port?: number
	middlewares?: Middleware[]
	preStartFunctions?: AsyncFunction[]
	onStart?: (app: Koa) => void
	config?: Config
}

// function checkRequestOrigin(allowed: string[]) {
// 	return function (ctx: Context) {
// 		const origin = ctx.get('origin')

// 		if (!allowed.includes(origin)) return ctx.throw(`${origin} is not a valid origin`)

// 		return origin
// 	}
// }

async function createServer(option: CreateServerOption): Promise<{app: any; start: () => void}> {
	const {preStartFunctions, middlewares = [], onStart, port} = option

	const app = new Koa()
	// compress the response file to speed up
	app.use(compress())
	// check xss Script
	app.use(xssCheck)
	// Filter CORS Problem
	// app.use(cors({origin: checkRequestOrigin(config.corsOrigins || [config.baseUrl])}))
	// parse Body
	app.use(bodyParser())
	app.use(async (ctx, next) => {
		ctx.status = 200
		await next()
	})

	await Promise.all(preStartFunctions.map((job) => job()))
	middlewares.forEach((middleware) => app.use(middleware))

	app.on('error', (err, ctx) => {
		ctx.status = err.statusCode || err.status || 500
		ctx.body = {message: 'server error'}
	})

	return {
		app,
		start: () => {
			app.listen(port)
			if (onStart) onStart(app)
		}
	}
}

export default createServer
