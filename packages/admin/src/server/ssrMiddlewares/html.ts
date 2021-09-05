import {Context} from 'koa'
export async function htmlMiddleware(ctx: Context) {
  const {clientConfig: config, clientConfigString, serverRenderer, favIcon32, favIcon16} = ctx.state
  const appString = await serverRenderer(ctx)
  if (ctx.state.routerContext?.url) {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" type="image/png" sizes="32x32" href="${favIcon32}" />
        <link rel="icon" type="image/png" sizes="16x16" href="${favIcon16}" />
      </head>
      <body>
        <div id="${config.appElementId}" style="min-height:100%; display:flex; flex-direction: column; flex-grow: 1;">${appString}</div>
        <div id="${config.modalElementId}"></div>
      </body>
      <script>
        window.__DEPLOY_ENV__ = "development";
        window.__APP_CONFIG__ = ${clientConfigString};
      </script>
    </html>
  `
}
