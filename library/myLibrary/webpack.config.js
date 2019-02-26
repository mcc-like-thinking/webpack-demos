const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'webpack-numbers.js',
		library: 'webpackNumbers', // library bundle 暴露为名为 webpackNumbers 的全局变量
		libraryTarget: 'umd' // 让 library 和其他环境兼容
	},
	externals: { // 不打包 lodash，而是使用 externals 来 require 用户加载好的 lodash
		lodash: { // 意味着library需要一个名为lodash的依赖，这个依赖在用户环境中必须存在且可用
			commonjs: 'lodash',
			commonjs2: 'lodash',
			amd: 'lodash',
			root: '_'
		}
	},
	devtool: 'source-map', // 在生产环境中使用source-map，有利于调试源码和运行基准测试
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader"
			]
		}]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({ // // 压缩js - 方式1
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			//new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin, 压缩css - 方式1
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					autoprefixer: true,
					preset: [
						'default', {
							discardComments: {
								removeAll: true
							}
						}
					]
				}
			})
		],
		// 将多个css chunk合并成一个css文件
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.scss|css$/,
					chunks: 'all', // merge all the css chunk to one file
					enforce: true
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Production'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/app.[name].css',
			chunkFilename: 'css/app.[contenthash:12].css' // use contenthash *
		})
	]
};


// 变量：作为一个全局变量，通过 script 标签来访问（libraryTarget:'var'）。
// this：通过 this 对象访问（libraryTarget:'this'）。
// window：通过 window 对象访问，在浏览器中（libraryTarget:'window'）。
// UMD：在 AMD 或 CommonJS 的 require 之后可访问（libraryTarget:'umd'）。