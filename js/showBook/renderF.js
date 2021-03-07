let T0 = new Date();
renderF = function(){

    let T1 = new Date();
    let dt = T1 - T0; 
    T0 = T1;

    for (let i=app.renderCall.length-1; i >-1; i--){

        let obj = app.renderCall[i];
        let end = obj.func(dt, obj.selfArea);

        if (end || obj.isEnd){
            app.renderCall.splice(i, 1);
        }
    }

    app.render.render(app.scene, app.camera);
    requestAnimationFrame(renderF);
}

renderF(app);