import {DefaultState, Context} from 'koa'
import Router from 'koa-router'
import compose from 'koa-compose'

import {setApp} from '@blog/admin/src/server/ssrMiddlewares/app'
import {htmlMiddleware} from '@blog/admin/src/server/ssrMiddlewares/html'

export function getSSRServerMiddlewares() {
  const router = new Router<DefaultState, Context>()
  // TODO: Route Static Resources

  router.use(setApp)
  router.get('(.*)', htmlMiddleware)
  // https://github.com/ZijianHe/koa-router
  // routes for middlewares, allowedMethods for separaate Allow Header Requied Methods
  return compose([router.routes(), router.allowedMethods()])
}
