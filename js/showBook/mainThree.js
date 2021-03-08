/**
 * 这里是最基本的系统
 * auther {whl}
 */
const app = {};
app.Err = {};

app.Err.errStr = `
<h1>{{info}}</h1>
`

app.Err.error = function (info){

    this.shower.innerHTML= this.errStr.replace('{{info}}', info);
}

app.Err.init = function (){

    const child = document.createElement('div');
    child.style.cssText = `
        color:red;
        background-color:black;
    `;
    document.body.appendChild(child);
    this.shower = child;
}


/**
 * 初始化渲染器
 * @returns {String} 是否出现错误，错误会由app调用Err表示
 */
app.initThree = function (){

    if (!THREE){
        return '引擎未加载';
    }

    this.saveDiv = document.getElementById('bookShow'); 
    this.width = this.saveDiv.clientWidth;
    this.height= this.saveDiv.clientHeight;

    const render =new THREE.WebGLRenderer({});
    render.shadowMap.enabled = true;
    render.setSize(this.width, this.height);

    this.render = render;
    this.saveDiv.appendChild(render.domElement);
}

/**
 * 初始化摄像机
 * @returns {String} 是否出现错误，错误会由app调用Err表示
 */
app.initCamera = function (){

    const camera = new THREE.PerspectiveCamera(60,
         this.width / this.height, 1, 10000);
    camera.position.z = 10;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);
    this.camera = camera;
}

/**
 * 初始化场景
 * @returns {String} 是否出现错误，错误会由app调用Err表示
 */
app.initSence = function (){
    this.scene = new THREE.Scene();
}

/**
 * 初始化灯光
 * @returns {String} 是否出现错误，错误会由app调用Err表示
 */
app.initLight = function (){

    const dLight = new THREE.DirectionalLight(0xffffff, 1.0, 0);
    dLight.position.set(10, 10, 10);
    this.scene.add(dLight);

    this.dLight = dLight;

    const aLight = new THREE.AmbientLight(0x444444);
    this.scene.add(aLight);
    this.aLight = aLight;
}

/**
 * 初始化物件
 * @returns {String} 是否出现错误，错误会由app调用Err表示
 */
app.initObject = function (){
    this.objs = {};
}

/**
 * 初始化Three
 * @returns {String} 是否出现错误，错误会由app调用Err表示
 */
app.init = function() {

    this.Err.init();

    let info = this.initThree();
    if (info){
        Err.error(info);
        return;
    }

    info = this.initCamera();
    if (info){
        Err.error(info);
        return;
    }

    info = this.initSence();
    if (info){
        Err.error(info);
        return;
    }
    
    info = this.initLight();
    if (info){
        Err.error(info);
        return;
    }

    info = this.initObject();
    if (info){
        Err.error(info);
        return;
    }

    this.renderCall = [];
    this.objDefNum = 0;

    app.T0 = new Date();
    app.renderF();

    return this;
}

/**
 * 为场景添加一个动画
 * @param {object} param0 func代表需要实时渲染的动画
 */
app.addAni = function({name = "NONAME", func, ...selfArea}) {

    app.renderCall.push({
        name,
        func,
        isEnd :false,
        selfArea
    });
    return this;
}

/**
 * 结束一个
 * TODO： 这里应该实现在线性时间内结束动画。但这里因为时间关系并没有决定去实现
 * @param {string} name 提供一个函数名字结束动画
 */
app.delAni = function(name) {

    for (let o of this.renderCall){
        
        if (o.name === name){
            o.isEnd = true;
            return this;
        }
    }
}

/**
 * 是否已经存在该物件
 * @param {string} name 物件的名称
 * @returns {boolean} 是否存在该物件
 */
app.hasObj = function(name){

    return this.objs[name] !== undefined;
}

/**
 * 向场景中添加物件
 * @param {Three.Object} mesh 一个可以添加到场景中的物件
 * @param {string} name 物件的名称，你可以使用名称从场景中获取物件
 */
app.addObj = function(mesh, name = '_objDefName' + (this.objDefNum++)){

    if (this.hasObj(name)){
        return this;
    }
    this.objs[name] = mesh;
    this.scene.add(mesh);
    return this;
}

/**
 * 隐藏物件
 * 其实现方式是通过将其从场景中移除
 * @param {string} name 物件的名称
 */
app.hindObj = function (name){
    this.scene.remove(this.objs[name]);
    return this;
}

/**
 * 显示物件
 * 其实现方式是通过将其再次添加到场景中
 * @param {string} name 物件的名称
 */
app.showObj = function (name){
    this.scene.add(this.objs[name]);
    return this;
}

/**
 * 渲染部分
 */
app.renderF = function(){

    let T1 = new Date();
    let dt = T1 - app.T0; 
    app.T0 = T1;

    for (let i=app.renderCall.length-1; i >-1; i--){

        let obj = app.renderCall[i];
        let end = obj.func(dt, obj.selfArea);

        if (end || obj.isEnd){
            app.renderCall.splice(i, 1);
        }
    }

    app.render.render(app.scene, app.camera);
    requestAnimationFrame(app.renderF);
}