import icon from '../images/icon.png';
import $ from 'jquery';

const xd = '小滴课堂';

const img = new Image();

img.src = icon;

document.body.appendChild(img);

$('body').append('<h1>我是jquery引入的包</h1>');
