import path from 'path'
import {Configuration} from 'webpack'
import {merge} from 'webpack-merge'

import {DictType} from '@blog/shared/types'
import {getBaseWebpackConfig} from '@blog/shared-webpack/config/base.config'

type GetClientConfigArgs = {
	packagePath: string
	entries: DictType<string>
	assetsPrefix: string
	enableSourceMap?: boolean
}

export function getClientWebpackConfig({packagePath, entries, assetsPrefix, enableSourceMap}: GetClientConfigArgs): Configuration {
	const output = path.join(packagePath, './dist')
	const baseConfig = getBaseWebpackConfig({tsConfigPath: path.join(packagePath, 'tsconfig.json')})
	return merge(baseConfig, {
		mode: 'development',
		context: packagePath,
		entry: entries,
		target: 'web',
		devtool: enableSourceMap ? false : false,
		output: {
			filename: '[name].[hash].js',
			path: `${output}/assets/`,
			publicPath: assetsPrefix
		},
		plugins: [],
		optimization: {
			splitChunks: {
				minSize: 100000,
				cacheGroups: {
					modules: {
						test: /[\\/]node_modules[\\/]/,
						chunks: 'all'
					}
				}
			}
		}
	})
}
