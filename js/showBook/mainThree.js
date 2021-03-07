const app = {};

/**
 * 初始化渲染器
 * @returns {String} 是否出现错误
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

app.initCamera = function (){

    const camera = new THREE.PerspectiveCamera(60,
         this.width / this.height, 1, 10000);
    camera.position.z = 10;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);
    this.camera = camera;
}

app.initSence = function (){
    this.scene = new THREE.Scene();
}

app.initLight = function (){

    const dLight = new THREE.DirectionalLight(0xffffff, 1.0, 0);
    dLight.position.set(10, 10, 10);
    this.scene.add(dLight);

    this.dLight = dLight;

    const aLight = new THREE.AmbientLight(0x444444);
    this.scene.add(aLight);
    this.aLight = aLight;
}

app.initObject = function (){
    this.objs = {};
}

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
}

app.init();