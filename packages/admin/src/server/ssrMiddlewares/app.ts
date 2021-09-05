import {Context} from 'koa'

import sharedClientConfig from '@blog/shared/client/config'

import config from '@blog/admin/config'
import App from '@blog/admin/src/app'
import {renderApp as serverRenderer} from '@blog/admin/src/server/render'

export const clientConfig = {...sharedClientConfig, ...config}
const configString = JSON.stringify(clientConfig)

function getAppSettings() {
  return {
    App,
    serverRenderer,
    clientConfig,
    clientConfigString: configString,
    favIcon32: `${config.assetsPrefix}/images/favicon-32x32.png`,
    favIcon16: `${config.assetsPrefix}/images/favicon-16x16.png`
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setApp(ctx: Context, next) {
  // eslint-disable-next-line no-param-reassign
  ctx.state = {...ctx.state, ...getAppSettings()}
  return next()
}
