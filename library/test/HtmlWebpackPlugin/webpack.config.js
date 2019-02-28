var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];
module.exports = {
  context: __dirname,
  entry: {
    b: './b.js',
    d: './d.js',
    a: './a.js',
    c: './c.js',
    e: './e.js'
  },
  output: {
    path: path.join(__dirname, 'dist/webpack-' + webpackMajorVersion),
    publicPath: '',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.png$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      //inject: true,
      filename: 'first-file.html',
      template: 'template.html',
      //chunksSortMode: 'manual',
      chunks: ['b', 'c']
    }),
    new HtmlWebpackPlugin({
      //inject: true,
      filename: 'second-file.html',
      template: 'template.html',
      //chunksSortMode: 'manual',
      chunks: ['a', 'b', 'd']
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ]
};