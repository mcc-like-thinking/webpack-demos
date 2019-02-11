const webpack = require('webpack'); // webpack内置插件
const merge = require('webpack-merge');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const base = require('./webpack.base.js');

module.exports = merge(base, {
	mode: 'production',
	//避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
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
		splitChunks: { // 将index.css、style.css、layout.css、circle.css合并成一个css文件
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
		// new UglifyJSPlugin({ // 压缩js - 方式2
		// 	sourceMap: true
		// }),
		// new OptimizeCSSAssetsPlugin() // 压缩css - 方式2
		// new webpack.DefinePlugin({
		// 	'process.env.NODE_ENV': JSON.stringify('production') // 定义环境变量process.env.NODE_ENV，任何位于/src的本地代码都可以关联到此变量
		// }),
		new MiniCssExtractPlugin({
			filename: 'css/app.[name].css',
			chunkFilename: 'css/app.[contenthash:12].css' // use contenthash *
		})
	]
})