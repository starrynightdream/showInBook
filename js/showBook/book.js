createBookItem = ()=>{

    if (!app){
        Err.error('未初始化完成');
    }

    const bookGeo = new THREE.BoxGeometry(3, 3, 3);
    const bookMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        // transparent : true,
    });
    const book = new THREE.Mesh(bookGeo, bookMat);
    book.position = new THREE.Vector3(0,0,0);

    app.scene.add(book);
    if (!app.objs.book){
        app.objs.book = book;
    }
}

createBookItem();