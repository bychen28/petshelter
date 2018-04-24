// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.use(express.static(path.join(__dirname,'/meanEXAM/dist')));


// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/beltexam2');
var ShelterSchema = new mongoose.Schema({
        name: {type: String, required: [true,"Name Must be Filled Out"], unique: [true,"Name has been taken"],minlength: 3},
        type: {type: String, required: [true,"Type Must be Filled Out"], minlength: 3},
        desc: {type: String, required: [true,"Description Must be Filled Out"], minlength: 3},
        skill1: {type: String,default: ""},
        skill2: {type: String,default: ""  },
        skill3: {type: String,default: ""},
        likes: {type: Number, default: 0 }
}, {timestamps: true });

   mongoose.model('Pet',ShelterSchema); // We are setting this Schema in our Models as 'User'
   var Pet = mongoose.model('Pet') // We are retrieving this Schema from our Models, named 'User'
// Use native promises
// mongoose.Promise = global.Promise;
   


app.get('/home',function(req,res){
    console.log("Am i Here")
    //Pet.find({}).sort('parameter').exec(function())
    Pet.find({},function(err,pets){
        if(err){
            res.json({message: "Error",Reason: "No Pets Were Found"})
        }
        else{
            res.json({message:"Success", data: pets})
        }
    })
})
app.post('/pets/new',function(req,res){
    console.log("hit the POST DB route")
    var pet = new Pet();
    pet.name = req.body.name
    pet.type = req.body.type
    pet.desc = req.body.desc;
    pet.skill1 = req.body.skill1;
    pet.skill2 = req.body.skill2;
    pet.skill3 = req.body.skill3;
    pet.like = 0
    
    pet.save(function(err){
        console.log("Qwerqwerqwerqwe", err)
       if(err){
           if(err.name == "BulkWriteError") {
               console.log(this.error)
            res.json({message: "Unique Error", error: err})
           }
          else{
            res.json({message: "Error",error: err})
          }
       }
       else{
           res.json({message:"Added Pet", data: pet})
       }
    })
})

app.put('/pets/:id',function(req,res){
    console.log("Hello Edit")
    Pet.findOne({_id: req.params.id}, function(err,pet){
        console.log("TESTING UNDEFINED")
        console.log(pet)
        if(pet){
            pet.name = req.body.name
            pet.type = req.body.type;
            pet.desc = req.body.desc;
            pet.skill1 = req.body.skill1;
            pet.skill2 = req.body.skill2;
            pet.skill3 = req.body.skill3;
            pet.like = req.body.like
        }
        pet.save(function(err){
            if(err){
                res.json({message: "Error", error: pet.errors})
            }
            else{
                res.json({message: "Success", data: pet})
            }
        })
    })
})

app.get('/pets/:id',function(req,res){
    Pet.findOne({_id: req.params.id}, function(err, pet){
        if(err){
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Success", data: pet})
        }
    })
})

app.put('/pets/up/:pid',function(req,res){
    console.log(req.body.id + "undef?!?")
    Pet.findOne({ _id: req.body._id},function(err,pet){
        pet.likes
        console.log(req.params)
        if(req.params.pid == pet._id){
            pet.likes += 1
            // console.log(req.params.pid)
        }
    pet.save(function (err) {

        if (err) {
            console.log("Returned error", err);

            // respond with Error JSON
            res.json({ message: "Error", error: pet.errors })
        }
        else {
            // respond with JSON
            res.json({ message: "Success"})
        }
    })
})
})
app.delete('/pets/:id',function(req,res){
    console.log("delete route")
    Pet.remove({_id: req.params.id},function(err){
        if(err){
            res.json({message: "Error", error: err})
        } else{
            res.json({message:"Success"})
        }
    })
})

app.all("*",(req,res,next) => {
    res.sendFile(path.resolve("./meanEXAM/dist/index.html"))
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})