//webpack

const path = require('path')
const webpack = require('webpack') //webpack 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽离 css 文件，使用这个插件需要单独配置JS和CSS压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //压缩JS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') //压缩CSS
// const FileManagerPlugin = require('filemanager-webpack-plugin'); //webpack copy move delete mkdir archive


module.exports = {
  target: 'node',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  mode: 'development',

  devtool: 'source-map',

  //入口
  entry: {
    server: './app/api/server.ts'
  },

  //出口
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: 'react-data-grider',
    libraryTarget: 'umd'
  },

  resolve: {
    modules: [path.resolve('node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'] //配置省略后缀名
  },

  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore', 'sequelize'],

  //规则
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  },

  watch: true,
  watchOptions: {
    poll: 2000,
    aggregateTimeout: 2000,
    ignored: /node_modules|vendor|build|public|resources|dist/
  },
}
