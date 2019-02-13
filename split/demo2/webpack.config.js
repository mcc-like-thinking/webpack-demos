const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会默认生成 index.html 文件， 所有的 bundle 会自动添加到 此html 中
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹

//const Visualizer = require('webpack-visualizer-plugin'); // 输出结果分析插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	// entry: {
	// 	app: './src/index.js'
	// },
	entry: [
		// "core-js/modules/es6.promise",
	    // "core-js/modules/es6.array.iterator",
	    // "promise-polyfill",
	    "babel-polyfill",
	    path.resolve(__dirname, "src/index.js"),
	],
	output: {
		filename: '[name].bundle.js', // 根据入口起点名称动态生成bundle名称
		chunkFilename: '[name].bundle.js', // 非入口 chunk 的名称
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map', // 将编译后的代码映射回原始源代码，使更容易追踪到错误和警告(开发环境)
	devServer: { // web服务器(webpack-dev-server提供)会自动重新加载编译后的代码
		contentBase: './dist' // 告诉开发服务器(dev server)，在哪里查找文件
	},
	plugins: [
	    new CleanWebpackPlugin(['dist']),
	    new HtmlWebpackPlugin({
	    	title: 'Code Splitting'
	    }),

	    // new Visualizer({
	    // 	filename: './statistics.html'
        // }),
        new BundleAnalyzerPlugin()
	]
};