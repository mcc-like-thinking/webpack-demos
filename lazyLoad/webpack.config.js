const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会默认生成 index.html 文件， 所有的 bundle 会自动添加到 此html 中
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹

const Visualizer = require('webpack-visualizer-plugin'); // 输出结果分析插件
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	// entry: {
	// 	app: './src/index.js'
	// },
	entry: [
	    "babel-polyfill", // 兼容至ie9浏览器
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
	module: {
		rules: [
		    {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,

				//更为推荐的方式是在.bablerc文件中配置以下设置
				options: {
					presets: ['@babel/preset-env'],
					plugins: ['@babel/plugin-transform-runtime','@babel/plugin-syntax-dynamic-import']
				}
			}
		]
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
		            test: /[\\/]node_modules[\\/]/
		        }
		    }
		}
	},
	plugins: [
	    new CleanWebpackPlugin(['dist']),
	    new HtmlWebpackPlugin({
	    	title: 'Lazy Loading'
	    }),

	    new Visualizer({
	    	filename: './statistics.html'
        }),
        //new BundleAnalyzerPlugin()
	]
};