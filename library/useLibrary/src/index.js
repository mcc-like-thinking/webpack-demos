// require('lodash'); // 在library的webpack.config.js中，若没有通过ProvidePlugin插件，由webpack去动态加载lodash，则在此需要引入lodash

// import * as webpackNumbers from 'first-library-of-mcc';

var webpackNumbers = require('../../myLibrary/dist/webpack-numbers.js')
// var webpackNumbers = require('first-library-of-mcc')

console.log(webpackNumbers.numtoword(4))
console.log(webpackNumbers.wordtonum('Five'))
console.log(webpackNumbers.wordtonum('Six'))