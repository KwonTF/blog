// Webpack Typescript Guide
// https://webpack.js.org/configuration/configuration-languages/
import path from 'path'

export default {
	entry: './src/index.tsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /\.\/node_modules/,
				loader: 'babel-loader',
				options: {presets: ['@babel/preset-react', '@babel/preset-typescript']}
			},
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
		]
	}
}
