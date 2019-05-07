const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会默认生成 index.html 文件， 所有的 bundle 会自动添加到 此html 中
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次构建前清理 /dist文件夹

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	// 多入口
	entry: [
	    'babel-polyfill',
		path.resolve(__dirname, "src/index.js")
	],
	output: {
		filename: '[name].bundle.js', // 根据入口起点名称动态生成bundle名称
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map', // 将编译后的代码映射回原始源代码，使更容易追踪到错误和警告(开发环境)
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
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	devServer: { // web服务器(webpack-dev-server提供)会自动重新加载编译后的代码
		// host: 'localhost', // A
		port: 3000,
		contentBase: './dist', // 告诉开发服务器(dev server)，在哪里查找文件
		proxy: {
            '/api': {
                changeOrigin: true, //把当前本地express服务器由A变为向B请求并返回( changes the origin of the host header to the target URL)
                target: 'http://www.yideschool.com/mhh', //B
                pathRewrite: { "^/api" : "" }
            },
            '/test': {
                target: 'http://139.159.142.225:10095', // 请求的接口域名或IP地址，开头是http或https
                // secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 是否跨域，如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/test': '' //表示需要rewrite重写路径
                }
            }
        }
	},
	plugins: [
	    new VueLoaderPlugin(),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html',
		})
	]
};