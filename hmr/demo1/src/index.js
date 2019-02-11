import _ from 'lodash';
import printMe from './print.js';
import './index.css';

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');

	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;
	element.appendChild(btn);

	return element;
}

let element = component(); // 当print.js改变导致页面重新渲染时，重新获取渲染元素
document.body.appendChild(element);

// 当print.js内部发生变更时，告诉webpack接受更新的模块
console.log(module,module.hot)
if (module.hot) {
	module.hot.accept('./print.js',function(){
		console.log('Accepting the updated printMe module!');
		document.body.removeChild(element);

		element = component(); // 页面重新渲染后，component更新click时间处理
		document.body.appendChild(element);
	})
}