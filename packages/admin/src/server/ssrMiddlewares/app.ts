import path from 'path'
import {Context} from 'koa'

import sharedClientConfig from '@blog/shared/client/config'

import paths, {root} from '@blog/admin/config/paths'
import config from '@blog/admin/config'
import App from '@blog/admin/src/app'
import {renderApp as serverRenderer} from '@blog/admin/src/server/render'

export const clientConfig = {...sharedClientConfig, ...config}
const configString = JSON.stringify(clientConfig)

function getAppSettings({isIE}: {isIE?: boolean}) {
  return {
    App,
    serverRenderer,
    clientConfig,
    clientConfigString: configString,
    webStatsFile: path.resolve(root, paths.scripts, './assets/loadable-stats.json'),
    entryPoints: [isIE ? 'ie' : 'client']
  }
}

export function setApp(ctx: Context, next) {
  const ua = ctx.get('user-agent')
  const isIE = /MSIE|Trident/i.test(ua)
  // eslint-disable-next-line no-param-reassign
  ctx.state = {...ctx.state, ...getAppSettings({isIE})}
  return next()
}
