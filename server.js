
const express = require('express');
const dotenv = require('dotenv');
// dotenv helps in hiding the actual port from other users 
const app = express();
const morgan = require('morgan')
const bodyparser=require('body-parser');
//to make call on api from here
const axios = require('axios');
// Handling CORS policy error
const cors = require("cors");
app.use(cors());

// Connecting with mongodb database
const mongoose=require('mongoose');
const uri = "mongodb+srv://Divyendu:Divyendu%4011@cluster0.ipeu9wm.mongodb.net/?retryWrites=true&w=majority";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(uri);
  console.log('connection est')
}
// DEFINING SCHEMA
const crud = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    stat:{
        type:String,
        required:true
    }
  });

// CONVERTING SCHEMA TO A MODEL
const crud_model = mongoose.model('crud_model', crud);
 

dotenv.config({path:'config.env'})
const port =process.env.port||8080
const path = require('path');


// log requests made on localhost 3000
app.use(morgan('tiny')) 

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

// set view engine(can use pug instead)
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))//Set the views directory


// load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/JS',express.static(path.resolve(__dirname,'assets/JS')))


// Endpoints
app.get('/',(req,res)=>{
    axios.get('http://localhost:3000/find')
    .then(function(response){
        console.log(response.data)
        res.render('index.pug',{users:response.data})
        
    }).catch(err=>{
        res.send(err)
    })
    
});

app.get('/add_user',(req,res)=>{
    res.render('add_user.pug')
});

// To create link for charts
app.get('/chart',(req,res)=>{
    res.render('chart.pug')
});


app.get('/update_user',(req,res)=>{
    axios.get('http://localhost:3000/find',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render("update_user.pug" ,{user:userdata.data})
        
    })

   
});

// To create a new collection 
app.post('/form',(req,res)=>{

    if (!req.body){
        res.status(500).send({message:"Data incomplete"})
        return;
    }; 
   

    var data = new crud_model({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        stat:req.body.stat
    });

    data.save().then(()=>{
        // res.send(req.body)
        res.redirect('/add_user')
    

    })
    .catch(err =>{
        res.status(404).send({message:"error"})
    })

})

// To retrieve info of single user
app.get('/find',(req, res) => {
    if (req.query.id) {
        const id = req.query.id
        crud_model.findById(id)
            .then(data => {
                if (!data) {
                    res.status(400)._construct({ message: 'No user Found' })
                } else {
                    res.send(data)
                }
            }).catch(err => {
                res.status(500).send({ message: "error" })
            })
    }
    // To retrieve info of all users
    else{
        crud_model.find()
        .then(user=>{
            res.send(user)
        }).catch(err =>{
            res.status(500).send({message:"error"})
        })
    }


})

// To update the data of user 
app.put('/:id',(req,res)=>{
    const id = req.params.id;
    crud_model.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:'Cannot find user'})
        }else{
            res.send(data)
        }
    }).catch(err =>{
        res.status(500).send({message:"Error updating user info"})
    } )

})

// To delete the data of user 
app.delete('/:id',(req,res)=>{
    const id = req.params.id;
    crud_model.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:'Cannot delete user'})
        }else{
            res.send({message:'Data deleted successfully'})
        }
    }).catch(err =>{
        res.status(500).send({message:"Error deleting user info"})
    } )

})


// Starting the server 
app.listen(port,()=>{
    console.log(`server running ${port}`)
})
