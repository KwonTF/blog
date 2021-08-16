import {getClientWebpackConfig} from '@blog/shared/webpack/config/client.config'

export default getClientWebpackConfig({
  packagePath: __dirname,
  entries: {
    // TODO: Fix to ts file
    client: ['./src/app/index.tsx']
  },
  assetsPrefix: '/admin/assets',
  isDev: true
})
