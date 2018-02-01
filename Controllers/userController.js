var mongoose=require("../db/conn");
var jwt=require("jsonwebtoken");
var {User}=require("../models/Users");
var bcrypt=require('bcrypt');

exports.register=(req,res)=>{
    var user=new User(req.body);
    user.hash_password=bcrypt.hashSync(req.body.password,10);
    user.save().then((doc)=>{
        console.log(doc);
        user.hash_password=undefined;
        res.json(doc);
    }).catch((e)=>{
        console.log(e);
    });
};
exports.sign_in=(req,res)=>{
    var email=req.body.email;
    console.log("email ",email)
    User.findOne({email}).then((user)=>{
        console.log(user)
        if(!user){
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        else if(user){
            if(!bcrypt.compareSync(req.body.password,user.hash_password)){
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            }
            else{
                return res.json({token: jwt.sign({ email: user.email, name: user.uname, _id: user._id}, 'RESTFULAPIs')});
            }
        }
    }).catch((e)=>{
       console.log(e);

    });

};
exports.login_req=(req,res,next)=>{
    if(req.user){
        next();
    }
    else{
        return res.status(401).json({message:'Unauthorised User !'});
    }
};