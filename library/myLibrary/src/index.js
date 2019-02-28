// new webpack.ProvidePlugin({ // ProvidePlugin 可以将模块作为一个变量，被webpack在其他每个模块中引用。只有你需要使用此变量的时候，这个模块才会被 require 进来
// 			_: ['lodash']
// })
import _ from 'lodash'; // 通过ProvidePlugin插件，由webpack去动态加载此依赖，此加载可去掉

import numRef from './ref.json';

//import './style.css' // 此导入，编译后不能获得library

/*
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'webpack-numbers.js', // //打包之后生成的文件名，可以随意写
		library: 'webpackNumbers', // library bundle 暴露为名为 webpackNumbers 的全局变量(类库名)
		libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
		globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
		libraryTarget: 'umd' // (指定library兼容的环境)定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
	}
*/
// function createTransalator() {
//     return {
//         numtoword: (num) => {
//             return num < 0 || num > 5 ? 'This is a failure' : converttoword(num);
//         },
//         wordtonum: (word) => {
//             const num = converttonum(word);
//             return num === -1 ? 'This is a failure' : num;
//         }
//     };
// }

// const converttoword = (num) => {
//     return _.reduce(numRef, (accum, ref) => {
//         return ref.num === num ? ref.word : accum;
//     }, '');
// };

// const converttonum = (word) => {
//     return _.reduce(numRef, (accum, ref) => {
//         return ref.word === word && word.toLowerCase() ? ref.num : accum;
//     }, -1);
// };
// export default createTransalator();


export function numtoword(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
};

export function wordtonum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
};