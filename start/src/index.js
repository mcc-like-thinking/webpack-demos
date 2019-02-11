import _ from 'lodash';
import './icon/iconfont.css';
import './index.css';
import catUrl from './images/cat.jpg'; // cat.jpg将被处理添加到output目录，并且catUrl变量将包含该图像在处理后的最终url
import Data from './data.xml'; // Data 变量将包含可直接使用的【已解析】JSON

function component() {
	var element = document.createElement('div');

	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('hello');

	var i = document.createElement('i');
	i.classList.add('iconfont');
	i.classList.add('icon-emoji_fill');
	element.appendChild(i);

	// 加入br标签使换行
	var br = document.createElement('br');
	element.appendChild(br);

	// 将图像添加到我们现有的 div
    var fatCat = new Image();
    fatCat.src = catUrl;
    element.appendChild(fatCat);

    console.log(Data)

	return element;
}

document.body.appendChild(component());