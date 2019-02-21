const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会默认生成 index.html 文件， 所有的 bundle 会自动添加到 此html 中
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹

module.exports = {
	mode: 'development',
	// 多入口
	entry: {
		app: './src/index.js'
	},
	output: {
		//filename: '[name].bundle.js', // 根据入口起点名称动态生成bundle名称
		filename: '[name].[chunkhash].js', // 在文件名中包含一个chunk相关的哈希
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map', // 将编译后的代码映射回原始源代码，使更容易追踪到错误和警告(开发环境)
	devServer: { // web服务器(webpack-dev-server提供)会自动重新加载编译后的代码
		contentBase: './dist' // 告诉开发服务器(dev server)，在哪里查找文件
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
	plugins: [
	    new CleanWebpackPlugin(['dist']),
	    new HtmlWebpackPlugin({
	    	title: 'Caching'
	    }),
	    // bundle 会随着自身的 module.id 的修改，而发生变化。每个 module.id 会基于默认的解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。
	    // HashedModuleIdsPlugin 将使用模块的路径，而不是数字标识符
	    new webpack.HashedModuleIdsPlugin()
	]
};