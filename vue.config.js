// vue.config.js  
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'@request': resolve('./common/request')
			}
		},
		plugins: [
			new CopyPlugin([{
				from: path.join(__dirname, '/images'),
				to: path.join(__dirname + '/unpackage/', 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev',
					process.env.UNI_PLATFORM, '/pages/')
			}]),
			// new BundleAnalyzerPlugin({
			// 	openAnalyzer: process.env.NODE_ENV === 'production' // [development | production]
			// }),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		]
	},
	chainWebpack(config) {
		config
			.when(process.env.NODE_ENV === 'development', config =>
				config.devtool('inline-source-map')
			)
			.when(process.env.NODE_ENV === 'production', config =>
				config.devtool('eval')
			)
	}
}
