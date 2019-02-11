import { cube } from './math.js'

function component() {
  var element = document.createElement('pre');

  element.innerHTML = [
    'hello webpack!',
    '5 cubed is equal to' + cube
  ].join('\n\n');

  return element;
}

document.body.appendChild(component());