const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: './src/main.js',
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
      template: 'src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" }
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpeg|gif)$/,
        type: 'asset/resource'
      },
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