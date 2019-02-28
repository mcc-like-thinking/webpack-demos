const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会默认生成 index.html 文件， 所有的 bundle 会自动添加到 此html 中
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	context: __dirname,
	// 多入口
	entry: {
		main: './src/index.js',
		app: './src/app.js'
	},
	output: {
		filename: '[name].bundle.js', // 根据入口起点名称动态生成bundle名称
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map', // 将编译后的代码映射回原始源代码，使更容易追踪到错误和警告(开发环境)
	devServer: { // web服务器(webpack-dev-server提供)会自动重新加载编译后的代码
		contentBase: './dist' // 告诉开发服务器(dev server)，在哪里查找文件
	},
	module: {
		rules: [
		    {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			}
		]
	},
	// 此段不适合多入口场景？ 多个css chunk被合并后，找不到加载依赖，生成的html文件找不到要加载的css文件？
	// optimization: {
	// 	minimizer: [
	// 		//new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin, 压缩css - 方式1
	// 		new OptimizeCSSAssetsPlugin({
	// 			assetNameRegExp: /\.css$/g,
	// 			cssProcessor: require('cssnano'),
	// 			cssProcessorOptions: {
	// 				autoprefixer: true,
	// 				preset: [
	// 					'default', {
	// 						discardComments: {
	// 							removeAll: true
	// 						}
	// 					}
	// 				]
	// 			}
	// 		})
	// 	],
	// 	// 将多个css chunk合并成一个css文件
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			styles: {
	// 				name: 'styles',
	// 				test: /\.scss|css$/,
	// 				chunks: 'all', // merge all the css chunk to one file
	// 				enforce: true
	// 			}
	// 		}
	// 	}
	// },
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'main',
			filename: 'main.html',
			chunks: ['main']
		}),
		new HtmlWebpackPlugin({
			filename: 'app.html',
			template: './src/temp.html',
			chunks: ['app'], // 加载app对应的打包文件
			//excludeChunks: ['a', 'b'] // 加载非a、b对应的打包文件
		}),
		new MiniCssExtractPlugin({
			filename: 'css/app.[name].css',
			chunkFilename: 'css/app.[contenthash:12].css' // use contenthash *
		})
	]
};