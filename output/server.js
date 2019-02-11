// webpack-dev-middleware 配合 express server 的示例
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); // 一个容器，可以把webpack处理后的文件传递给服务器

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
app.use(webpackDevMiddleware(compiler,{
	publicPath: config.output.publicPath
}))

// Server the files on port 3000
app.listen(3000,function(){
	console.log('Example app listening on port 3000!\n')
})