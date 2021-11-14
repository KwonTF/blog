import {Configuration} from 'webpack'
import autoprefixer from 'autoprefixer'

export const getStyleLoaderConfig = (): Configuration => ({
  resolve: {extensions: ['.scss', '.css']},
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'isomorphic-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                //for IE Support
                plugins: [autoprefixer({grid: 'autoplace'})]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
})
