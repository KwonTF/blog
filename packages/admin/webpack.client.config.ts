import {getReactWebpackConfig} from '@blog/shared-webpack/config/react.config'

export default getReactWebpackConfig({
  packagePath: __dirname,
  entries: {
    // TODO: Fix to ts file
    client: ['./src/client/index.ts']
  },
  assetsPrefix: '/admin/assets',
  isDev: true
})
