const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
		    // 加载样式
			{
				test: /\.css$/,
				use: [
				    'style-loader',
				    'css-loader'
				]
			},
			// file-loader 和 url-loader 可以接收并加载任何文件
			// 加载图片
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
				    'file-loader'
				]
			},
			// 加载字体、字体图标等
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
				    'file-loader'
				]
			},

			// 加载数据，json文件、csv、tsv、xml等。另JSON 支持实际上是内置的，默认将正常运行。
			{
				test: /\.(csv|tsv)$/,
				use: [
				    'csv-loader'
				]
			},
			{
				test: /\.xml$/,
				use: [
				    'xml-loader'
				]
			}
		]
	}
};