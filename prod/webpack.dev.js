const merge = require('webpack-merge');
const base = require('./webpack.base.js');

//const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 用于webpack 3
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// webpack4升级指南: https://github.com/taikongfeizhu/react-mobx-react-router4-boilerplate

module.exports = merge(base, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	// module: { // 用于webpack 3
	//     rules: [
	//       {
	//         test: /\.css$/,
	//         use: ExtractTextPlugin.extract({
	//           fallback: "style-loader",
	//           use: "css-loader"
	//         })
	//       }
	//     ]
	// },
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						// you can specify a publicPath here
						// by default it use publicPath in webpackOptions.output
						//publicPath: '../'
					}
				},
				"css-loader"
			]
		}]
	},
	plugins: [
		//new ExtractTextPlugin("styles.css") // 设置提取出的css文件的名称
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css", // 【动态】设置提取出的css文件的名称
			chunkFilename: "[id].css"
		})
	]
})