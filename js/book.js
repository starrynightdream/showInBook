createBookItem = ()=>{

    if (!app){
        Err.error('未初始化完成');
        return ;
    }

    // const bookGeo = new THREE.BoxGeometry(4, 0.5, 6);
    // const bookMat = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     // transparent : true,
    // });
    // const bookL = new THREE.Mesh(bookGeo, bookMat);
    // const bookR = new THREE.Mesh(bookGeo, bookMat);
    // const book = new THREE.Group();
    // bookL.position.x -= 2;
    // bookR.position.x += 2;
    // book.add(bookL);
    // book.add(bookR);
    // book.position.set(0, -4, -4);

    // app.addObj(book, 'book');

    const book = new THREE.Group();

    // 生成封面
    const bookCoverGeo = new THREE.BoxGeometry(4, 0.1, 6);
    const bookCenterCoverGeo = new THREE.BoxGeometry(1, 0.1, 6);
    const bookCoverMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
    });

    const bookCoverLeft = new THREE.Mesh(bookCoverGeo, bookCoverMat);
    const bookCoverRight = new THREE.Mesh(bookCoverGeo, bookCoverMat);
    const bookCoverCenter = new THREE.Mesh(bookCenterCoverGeo, bookCoverMat);

    bookCoverLeft.position.x -=2;
    bookCoverRight.position.x += 2;

    const bookCL = new THREE.Group();
    const bookCR = new THREE.Group();

    bookCL.add(bookCoverLeft);
    bookCR.add(bookCoverRight);
    bookCL.position.x -= 0.5;
    bookCR.position.x += 0.5;


    book.add(bookCL, bookCR, bookCoverCenter);

    app.addObj(book, 'book');

    // TODO: 在这里实现书本的动画与监听。

    // 动画函数
    book.attute = 0;
    const toLeft = () =>{

        new TWEEN.Tween(bookCL.position)
            .to({x: -0.5, y: 0}, 1000)
            .start();
        
        new TWEEN.Tween(bookCR.position)
            .to({x: -0.5, y: 1}, 1000)
            .start();
        
        new TWEEN.Tween(bookCR.rotation)
            .to({z: Math.PI}, 1000)
            .start();

        new TWEEN.Tween(bookCoverCenter.position)
            .to({x: -0.5, y:0.5}, 1000)
            .start();
        new TWEEN.Tween(bookCoverCenter.rotation)
            .to({z: Math.PI/2}, 1000)
            .start();
    }

    const toCenter = () =>{

        new TWEEN.Tween(bookCL.position)
            .to({x: -0.5, y: 0}, 1000)
            .start();
        
        new TWEEN.Tween(bookCL.rotation)
            .to({z: 0}, 1000)
            .start();


        new TWEEN.Tween(bookCR.position)
            .to({x: 0.5, y: 0}, 1000)
            .start();
        
        new TWEEN.Tween(bookCR.rotation)
            .to({z: 0}, 1000)
            .start();

        new TWEEN.Tween(bookCoverCenter.position)
            .to({x: 0, y:0}, 1000)
            .start();
        new TWEEN.Tween(bookCoverCenter.rotation)
            .to({z: 0}, 1000)
            .start();
    }

    const toRight = () =>{

        new TWEEN.Tween(bookCL.position)
            .to({x: 0.5, y: 1}, 1000)
            .start();
 
        new TWEEN.Tween(bookCL.rotation)
            .to({z: -Math.PI}, 1000)
            .start();

       
        new TWEEN.Tween(bookCR.position)
            .to({x: 0.5, y: 0}, 1000)
            .start();
        
        new TWEEN.Tween(bookCoverCenter.position)
            .to({x: 0.5, y:0.5}, 1000)
            .start();
        new TWEEN.Tween(bookCoverCenter.rotation)
            .to({z: -Math.PI/2}, 1000)
            .start();
    }


    document.onkeydown = (e) =>{
        
        if (e.key === 'a'){

            if (book.attute === 0){
                toLeft();
            }else if (book.attute > 0){
                toCenter();
            }else{
                book.attute +=1;
            }
            book.attute -=1;
        }

        if (e.key === 'd'){

            if (book.attute === 0){
                toRight();
            }else if (book.attute < 0){
                toCenter();
            }else{
                book.attute -=1;
            }

            book.attute +=1;
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
    // createSpriteEff();
}