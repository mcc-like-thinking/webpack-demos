const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./webpack.config.js')
const options = {
	contentBase: './dist',
	hot: true,
	host: 'localhost'
}

// 启用HMR: 修改 webpack 配置对象，使其包含 HMR 入口起点
webpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config)

// 将dev server 选项作为第二个参数传递
const server = new webpackDevServer(compiler, options)

server.listen(5000, 'localhost', ()=>{
	console.log('dev server listening on port 5000')
})