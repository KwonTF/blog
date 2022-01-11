import path from 'path'

import {getPaths} from '@blog/shared/config/paths'

export const root = path.normalize(`${__dirname}/..`)
export default getPaths(root)
