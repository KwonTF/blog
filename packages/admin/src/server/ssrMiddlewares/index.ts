import {DefaultState, Context} from 'koa'
import Router from 'koa-router'
import compose from 'koa-compose'
// import path from 'path'

// import {sharedStaticMiddlewares} from '@blog/shared/server/middlewares/sharedStatic'
// import {getStaticResourceMiddleware} from '@blog/shared/server/middlewares/staticResource'

// import {paths} from '@blog/admin/config/paths'
// import config from '@blog/admin/config'
import {setApp} from '@blog/admin/src/server/ssrMiddlewares/app'
import {htmlMiddleware} from '@blog/admin/src/server/ssrMiddlewares/html'

// TODO Add SSR Server MiddleWares
export function getSSRServerMiddlewares() {
  const router = new Router<DefaultState, Context>()
  // // Route Static Resources
  // sharedStaticMiddlewares(router)
  // router.use(getStaticResourceMiddleware('', path.join(paths.assets, '/root')))
  // router.use(getStaticResourceMiddleware(config.assetsPrefix, path.join(paths.scripts, '/assets')))
  // router.use(getStaticResourceMiddleware(config.assetsPrefix, paths.assets))
  // router.use(getStaticResourceMiddleware(config.assetsPrefix, paths.images))
  // router.use(getStaticResourceMiddleware(config.assetsPrefix, paths.libs))

  router.use(setApp)
  router.get('(.*)', htmlMiddleware)
  // https://github.com/ZijianHe/koa-router
  // routes for middlewares, allowedMethods for separaate Allow Header Requied Methods
  return compose([router.routes(), router.allowedMethods()])
}
