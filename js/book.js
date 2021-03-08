createBookItem = ()=>{

    if (!app){
        Err.error('未初始化完成');
    }

    const bookGeo = new THREE.BoxGeometry(4, 0.5, 6);
    const bookMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        // transparent : true,
    });
    const bookL = new THREE.Mesh(bookGeo, bookMat);
    const bookR = new THREE.Mesh(bookGeo, bookMat);
    const book = new THREE.Group();
    bookL.position.x -= 2;
    bookR.position.x += 2;
    book.add(bookL);
    book.add(bookR);
    book.position.set(0, -4, -4);

    app.addObj(book, 'book');

    // TODO: 在这里实现书本的动画与监听。

    document.onkeydown = (e) =>{
        
        if (e.key === 'a'){

            app.delAni('bookToRight');
            app.addAni({
                name : 'bookToLeft',
                func : (dt, selfArea) =>{
                    
                    if (book.position.x > -3){
                        book.position.x -= 0.001 *dt;
                    }else{
                        book.position.x = -3;
                        return true;
                    }
                }
            });
 
        }

        if (e.key === 'd'){

            app.delAni('bookToLeft');
            app.addAni({
                name : 'bookToRight',
                func : (dt) =>{

                    if (book.position.x < 3){
                        book.position.x += 0.001 *dt;
                    }else{
                        book.position.x = 3;
                        return true;
                    }
                }
            });
        }
    }
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
}

createBook = () =>{

    createBookItem();
    createSpriteEff();
}