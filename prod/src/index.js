import {
	cube
} from './math.js'
import './index.css'
import './style.css'
import ('./layout');

function component() {
	var element = document.createElement('pre');

	element.innerHTML = [
		'hello webpack!',
		'5 cubed is equal to' + cube
	].join('\n\n');
	element.classList.add('hello');
	element.classList.add('layout');

	//element.style.cssText = 'padding: 20px; border: 2px solid pink';

	var p = document.createElement('p');
	p.innerHTML = ['你好，mcc！']
	p.classList.add('mcc');
	element.appendChild(p);

	return element;
}

document.body.appendChild(component());