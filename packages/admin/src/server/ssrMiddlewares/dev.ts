import {Middleware} from 'koa'

import getSSRServerMiddlewares from './index'

export default (): Middleware => getSSRServerMiddlewares()
