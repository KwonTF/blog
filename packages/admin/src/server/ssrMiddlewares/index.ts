import {Middleware, DefaultState} from 'koa'
import Router from 'koa-router'
import compose from 'koa-compose'

// TODO Add SSR Server MiddleWares
export default function getSSRServerMiddlewares(): Middleware {
  const router = new Router<DefaultState>()
  return compose([router.routes()])
}
