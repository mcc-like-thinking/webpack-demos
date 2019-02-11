import _ from 'lodash';
import printMe from './print.js';

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');

	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;
	element.appendChild(btn);

	return element;
}

document.body.appendChild(component());

// 当print.js内部发生变更时，告诉webpack接受更新的模块
console.log(module,module.hot)
if (module.hot) {
	module.hot.accept('./print.js',function(){
		console.log('Accepting the updated printMe module!')
		printMe()
	})
}