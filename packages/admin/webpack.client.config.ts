import {getReactWebpackConfig} from '@blog/shared-webpack/config/react.config'

export default getReactWebpackConfig({
  packagePath: __dirname,
  entries: {
    client: './src/client/index.ts'
  },
  assetsPrefix: '/admin/assets',
  isDev: true
})
