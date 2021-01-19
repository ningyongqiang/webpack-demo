const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // clean-webpack-plugin需要output.path
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: 'src/main.html',
      filename: 'main.html',
      chunks: ['main']
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}