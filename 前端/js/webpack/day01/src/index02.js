import _ from 'lodash';
import './main.css';
import favor from './favor.jpeg';

function component(){
    let div = document.createElement("div");
    div.innerHTML=_.join(['hello','webpack'], ' ');
    div.classList.add('hello')
    const img = new Image();
    img.src = favor;
    div.appendChild(img);
    return div;
}
document.body.appendChild(component())