const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会默认生成 index.html 文件， 所有的 bundle 会自动添加到 此html 中
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹

//const Visualizer = require('webpack-visualizer-plugin'); // 输出结果分析插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	// 多入口
	entry: {
		app: './src/index.js',
		another: './src/another.js'
	},
	output: {
		filename: '[name].bundle.js', // 根据入口起点名称动态生成bundle名称
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map', // 将编译后的代码映射回原始源代码，使更容易追踪到错误和警告(开发环境)
	devServer: { // web服务器(webpack-dev-server提供)会自动重新加载编译后的代码
		contentBase: './dist' // 告诉开发服务器(dev server)，在哪里查找文件
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
		    minSize: 30000,
		    minChunks: 2,
		    maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
		    maxInitialRequests: 3, // 入口点上并行请求的最大数量
		    name: false, // 是否自动生成基于chunks和缓存组键的名称
		    cacheGroups: { // 缓存组
		        vendor: {
		            name: 'vendor',
		            chunks: 'all', // 有效值为all、async 和 initial
		            priority: -10, // 缓存组优先级，默认组优先级为负，允许自定义组具有更高的优先级(自定义组的默认值为0)
		            reuseExistingChunk: false,
		            //test: /node_modules\/(.*)\.js/
		            test: /[\\/]node_modules[\\/]/
		            //test: /[\\/]node_modules[\\/](lodash)[\\/]/,
		        }
		    }
		}
	},
	plugins: [
	    new CleanWebpackPlugin(['dist']),
	    new HtmlWebpackPlugin({
	    	title: 'Code Splitting'
	    }),
	    // new webpack.optimize.CommonsChunkPlugin({ // webpack中被移除
	    // 	name: 'common' // 指定公共bundle名称
	    // }),

	    // new Visualizer({
	    // 	filename: './statistics.html'
        // }),
        new BundleAnalyzerPlugin()
	]
};