/* eslint-disable no-param-reassign */
import http from 'http'
import Koa, {Middleware} from 'koa'
import compress from 'koa-compress'
// import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import {AsyncFunction} from '@blog/shared/types'
import logger from '@blog/shared-utils/logger'
// import xssCheck from '@blog/shared/server/middlewares/xssCheck'

let httpServer: http.Server
let shutdownInitiated = false

type Config = Record<string, any> & {
  baseUrl: string
  corsOrigins: string[]
}

type CreateServerOption = {
  port?: number
  middlewares?: Middleware[]
  preStartFunctions?: AsyncFunction[]
  shutdownJobs?: AsyncFunction[]
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

function shutdown(shutdownJobs: AsyncFunction[]) {
  if (shutdownInitiated) return
  shutdownInitiated = true

  const shutdownHook = async () => {
    try {
      await Promise.all((shutdownJobs || []).map((job) => job()))
    } catch (shutdownError) {
      // skip shutdownError
      logger.error('Shutdown error')
    } finally {
      setTimeout(() => {
        // timeout for stdout stream
        process.exit(0)
      }, 250)
    }
  }

  if (httpServer) {
    httpServer.close()
  }
  shutdownHook()
}

async function createServer(option: CreateServerOption): Promise<{app: any; start: () => void}> {
  const {preStartFunctions, middlewares = [], onStart, port, shutdownJobs} = option
  process.on('SIGINT', () => shutdown(shutdownJobs))

  const app = new Koa()
  // compress the response file to speed up
  app.use(compress())
  // check xss Script
  // app.use(xssCheck)
  // Filter CORS Problem
  // app.use(cors({origin: checkRequestOrigin(config.corsOrigins || [config.baseUrl])}))
  // parse Body
  app.use(
    bodyParser({
      jsonLimit: '20mb'
    })
  )
  app.use(async (ctx, next) => {
    ctx.status = 200
    await next()
  })

  await Promise.all(preStartFunctions?.map((job) => job()) || [])
  console.log(middlewares.length)
  middlewares.forEach((middleware) => app.use(middleware))

  app.on('error', (err, ctx) => {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {message: 'server error'}
  })

  return {
    app,
    start: () => {
      httpServer = app.listen(port, () => {
        logger.debug(`> Ready on http://localhost:${port}`)
      })
      if (onStart) onStart(app)
    }
  }
}

export default createServer
