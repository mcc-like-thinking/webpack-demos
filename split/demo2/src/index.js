// import _ from 'lodash';

// function component() {
//   var element = document.createElement('div');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   return element;
// }

// document.body.appendChild(component());
import 'babel-polyfill'

//不再使用静态导入 lodash，而是通过使用动态导入来分离一个 chunk：
// function getComponent() {
// 	return import ( /* webpackChunkName: "lodash" */ 'lodash').then(_ => { // 在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js
// 		var element = document.createElement('div');

// 		element.innerHTML = _.join(['Hello', 'webpack'], ' ');

// 		return element;

// 	}).catch(error => 'An error occurred while loading the component');
// }

// getComponent().then(component => {
// 	document.body.appendChild(component);
// })


// 使用async函数 @babel/runtime
async function getComponent() {
	var element = document.createElement('div');
	const _ = await import(/* webpackChunkName: "lodash" */ 'lodash'); // 在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js
	
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');

	return element;
}

getComponent().then(component => {
	document.body.appendChild(component);
})