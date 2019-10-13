import _ from 'lodash'
function component(){
    let div = document.createElement("div");
    div.innerHTML=_.join(['hello','webpack'], ' ');
    return div;
}
document.body.appendChild(component())