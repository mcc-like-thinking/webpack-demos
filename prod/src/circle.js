import './circle.css'

function component() {
	var element = document.createElement('div');

	element.classList.add('circle');

	return element;
}

document.body.appendChild(component());