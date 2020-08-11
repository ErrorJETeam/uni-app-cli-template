// vue.config.js
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

// eslint-disable-next-line no-unused-vars
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ['uni-simple-router'],
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@request': '@/common/request',
        '@utils': '@/common/utils'
      }
    },
    plugins: [
      new CopyPlugin([
        {
          from: path.join(__dirname, '/src/images'),
          to: path.join(
            __dirname,
            'dist',
            process.env.NODE_ENV === 'production' ? 'build' : 'dev',
            process.env.UNI_PLATFORM,
            '@/pages/'
          )
        }
      ]),
      new BundleAnalyzerPlugin({
        openAnalyzer: process.env.NODE_ENV === 'production' // [development | production]
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
}
