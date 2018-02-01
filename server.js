// call packages we need

//var router=express.Router();
//var port=process.env.PORT || 3000; // set the port

var express= require('express');
var app= express();
var bodyParser= require('body-parser');
var jwt=require("jsonwebtoken");
var route=require('./Routes/routes');
const {mongoose}=require('./db/conn');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT' ){
     jwt.verify(req.headers.authorization.split(' ')[1],'RESTFULAPIs',(err,decode)=>{
       if(err) req.user=undefined;
         req.user=decode;
         next();
     });
    }else{
        req.user=undefined;
        next();
    }
})
route.route(app);

app.listen(5555,()=>{
    console.log('Server is up on 3000.');
});
//module.exports=app;