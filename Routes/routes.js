exports.route=function(app){
    const userController=require('../Controllers/userController');
    const ProdController=require('../Controllers/ProdController');

    app.get('/task',ProdController.list);
    app.post('/task',userController.login_req, ProdController.add);

    app.get('/tasks/:id',ProdController.getOneRec);
    app.put('/tasks/:id',ProdController.updateProd);
    app.delete('/tasks/:id',ProdController.deleteProd);

    app.post('/task/register',userController.register);

    app.post('/task/sign',userController.sign_in);
};