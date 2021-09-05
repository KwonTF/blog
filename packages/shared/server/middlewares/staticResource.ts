import {Middleware} from 'koa'
import {send} from 'koa-send'

const thirtyDaysMillis = 60 * 60 * 24 * 30 * 1000
export function getStaticResourceMiddleware(requestPath: string, directoryPath: string): Middleware {
  if (!requestPath) throw new Error('Request Path Undefined')
  if (!directoryPath) throw new Error('Asset Path Undefined')
  const pathRegExp = new RegExp(`^${requestPath}/*`, 'i')
  const defaultIndex = 'index.html'

  return async (ctx, next) => {
    if (!pathRegExp.test(ctx.path)) return next()
    let done = false

    if (ctx.method === 'GET') {
      try {
        const opts = {
          root: directoryPath,
          maxAge: thirtyDaysMillis
        }
        const path = ctx.path.replace(pathRegExp, '') || defaultIndex

        // Use Koa-Send for request Resource With Root URL
        // https://falsy.me/koa-js%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%A0%95%EC%A0%81-%EC%84%9C%EB%B2%84%EB%A7%8C%EB%93%A4%EA%B8%B0-404-%EA%B2%BD%EB%A1%9C-%EC%A7%80%EC%A0%95%ED%95%98%EA%B8%B0-in-nodejs/
        done = await send(ctx, path, opts)
      } catch (err) {
        if (err.status !== 404) {
          throw err
        }
      }
    }

    if (!done) {
      await next()
    }
  }
}
