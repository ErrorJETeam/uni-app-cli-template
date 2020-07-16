// vue.config.js  
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'json', 'vue', 'html', 'scss']

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@request': resolve('./common/utils/request')
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
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new CompressionWebpackPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), //匹配文件名
				threshold: 10240, //对10K以上的数据进行压缩
				minRatio: 0.8,
				deleteOriginalAssets: false, //是否删除源文件
			})
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
