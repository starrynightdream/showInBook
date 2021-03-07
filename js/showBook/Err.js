const Err = {};

Err.errStr = `
<h1>{{info}}</h1>
`

Err.error = function (info){

    this.shower.innerHTML= this.errStr.replace('{{info}}', info);
}

Err.init = function (){

    const child = document.createElement('div');
    child.style.cssText = `
        color:red;
        background-color:black;
    `;
    document.body.appendChild(child);
    this.shower = child;
}

Err.init();
// Err.error('<h1>shower</h1>');