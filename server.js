// call packages we need

//var router=express.Router();
//var port=process.env.PORT || 3000; // set the port

var express= require('express');
var app= express();
var bodyParser= require('body-parser');
var Product=require('./models/product');
const {mongoose}=require('./db/conn');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    console.log('get req');
    res.send('done');
});
// ADD products------------------
app.post('/add',(req,res)=>{
    //console.log(req.body);

    res.send(req.body);
    let prod = new Product();      // create a new instance of the Product model

    prod.pname = req.body.pname;     // set the Product col values (comes from the request)
    prod.price = req.body.price;

    prod.save().then((doc)=>{
        console.log(doc);
        res.send(doc);
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    });
});
// GET ALL PRODUCTS --------------------
app.get('/all', (req, res)=> {
    console.log("all");
    Product.find().then((prod)=>{
        console.log("all prod ",prod);
        res.status(200).send(prod).end();

    },(e)=>{
        console.log("all e4rror ",e);
        res.status(400).send(e).end();
    })
});
// UPDATE PRODUCT -----------------------
app.put('/:id', (req, res) =>{
    // console.log("put");
    // console.log(req.params.id);
    Product.findById(req.params.id).then((doc)=>{

        //console.log(doc);
         doc.pname = req.body.pname || doc.name;     // set the Product col values (comes from the request)
         doc.price = req.body.price;

        doc.save().then((doc)=>{
            console.log(doc);
            res.send("Updated  "+doc);
        }).catch((err)=>{
            console.log(err);
            res.send(err);
        });
    }).catch((e)=>{});

});
// DELETE -------------------
app.delete('/:id',(req,res)=>{
    //findByIdAndRemove(req.params.id)
    Product.remove({_id:req.params.id}).then((doc)=>{
        console.log(doc);
        console.log("Deleted ");
    }).catch((e)=>{});
});

// get single record -----------------
app.get('/:id',(req,res)=>{
    var id = req.params.id;
console.log(id);
    // if (!ObjectID.isValid(id)) {
    //     return res.status(404).send();
    // }
    Product.findById(id).then((doc)=>{
        console.log(doc);
        res.send({doc});
    }).catch((e)=>{});
    }
);

app.listen(3000,()=>{
    console.log('Server is up on 3000.');
});