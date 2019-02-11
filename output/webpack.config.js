const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会默认生成 index.html 文件， 所有的 bundle 会自动添加到 此html 中
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹
const ManifestPlugin = require('webpack-manifest-plugin'); // 将数据提取到一个 json 文件，mainfest.json

module.exports = {
	// 多入口
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	output: {
		filename: '[name].bundle.js', // 根据入口起点名称动态生成bundle名称
		path: path.resolve(__dirname, 'dist'),
		//publicPath: '/' // 【使用dev-middleware的配置】 publicPath会在服务器脚本用到，已确保文件资源能够在http://localhost:3000 下正确访问
	},
	devtool: 'inline-source-map', // 将编译后的代码映射回原始源代码，使更容易追踪到错误和警告(开发环境)
	devServer: { // web服务器(webpack-dev-server提供)会自动重新加载编译后的代码
		contentBase: './dist' // 告诉开发服务器(dev server)，在哪里查找文件
	},
	plugins: [
	    new CleanWebpackPlugin(['dist']),
	    new HtmlWebpackPlugin({
	    	title: 'Output Management'
	    }),
	    new ManifestPlugin()
	]
};