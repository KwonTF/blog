import Koa from 'koa'
import Router from 'koa-router'

import sharedPaths from '@blog/shared/config/paths'

import {getStaticResourceMiddleware} from './staticResource'

export function sharedStaticMiddlewares(router: Koa | Router): void {
  router.use(getStaticResourceMiddleware('/assets/images', sharedPaths.images))
  router.use(getStaticResourceMiddleware('/assets/libs', sharedPaths.libs))
}
