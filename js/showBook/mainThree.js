const app = {};

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
            return;
        }
    }
}

app.init()