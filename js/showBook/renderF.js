renderF = function(app){

    app.render.render(app.scene, app.camera);
    requestAnimationFrame(renderF);
}

renderF(app);