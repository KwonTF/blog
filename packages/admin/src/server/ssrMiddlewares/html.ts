import {Context} from 'koa'
import {ChunkExtractor} from '@loadable/server'

import {renderStyles} from '@blog/admin/src/server/render/styles'

export async function htmlMiddleware(ctx: Context) {
  const {entryPoints: entrypoints, clientConfig: config, clientConfigString, serverRenderer, webStatsFile, envValues} = ctx?.state
  const styles = {}
  const webExtractor = new ChunkExtractor({statsFile: webStatsFile, entrypoints})
  const {renderedString: appString, css} = await serverRenderer({ctx, extractor: webExtractor, styles})
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
        ${renderStyles(styles)}
      </head>
      <body>
        <div id="${config.appElementId}" style="min-height:100%; display:flex; flex-direction: column; flex-grow: 1;">${appString}</div>
      </body>
      <script>
        window.__DEPLOY_ENV__ = "development";
        window.__APP_CONFIG__ = ${clientConfigString};
        window.__ENV_VALUES__ = ${JSON.stringify(envValues)};
      </script>
      ${webExtractor.getScriptTags()}
    </html>
  `
}
