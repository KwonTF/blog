import {Context} from 'koa'
export async function htmlMiddleware(ctx: Context) {
  const {clientConfig: config, clientConfigString, serverRenderer} = ctx?.state
  const {renderedString: appString, css} = await serverRenderer({ctx})
  if (ctx?.state?.routerContext?.url) {
    ctx.redirect(ctx.state.routerContext.url)
    return
  }

  ctx.set('Content-Type', 'text/html')
  // eslint-disable-next-line no-param-reassign
  ctx.body = `
  <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="${config.appElementId}" style="min-height:100%; display:flex; flex-direction: column; flex-grow: 1;">${appString}</div>
      </body>
      <script>
        window.__DEPLOY_ENV__ = "development";
        window.__APP_CONFIG__ = ${clientConfigString};
      </script>
    </html>
  `
}
