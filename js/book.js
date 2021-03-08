createBookItem = ()=>{

    if (!app){
        Err.error('未初始化完成');
    }

    const bookGeo = new THREE.BoxGeometry(8, 0.5, 6);
    const bookMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        // transparent : true,
    });
    const book = new THREE.Mesh(bookGeo, bookMat);
    book.position.set(0, -4, -4);

    app.addObj(book, 'book');

    // TODO: 在这里实现书本的动画与监听。
}

createSpriteEff = () =>{

    if (!app){
        Err.error('未初始化完成');
    }

    const spriteTexture = new THREE.TextureLoader().load("/res/img/star.png");
    const spriteMat = new THREE.SpriteMaterial({
        map: spriteTexture
    });

    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(0.5, 0.5);

    app.addObj(sprite, 'starSprite');

    // TODO: 调整动画使之成为粒子
    app.addAni({
        func: (dt, selfArea) =>{
            sprite.position.x += dt * 0.001 * selfArea.face;
                
            if (Math.abs(sprite.position.x) > 4){
                selfArea.face *=-1;
                app.delAni('rotate')
            }
        },
        face :1,
    });
        
    app.addAni( {
        name: 'rotate',
        func: (dt) =>{
            sprite.material.rotation += Math.PI/1024 *dt;
        }
    });

    document.onkeydown = (eve) =>{

        if (eve.key === 'd'){
            app.scene.remove(sprite);
        }else if (eve.key === 'a'){
            let posX = Math.random() *6 -3;
            let posY = Math.random() *6 -3;
            sprite.position.set(posX, posY);
            app.scene.add(sprite);
        }
    }
}

createBook = () =>{

    createBookItem();
    createSpriteEff();

    console.log(app.objs.starSprite)
}