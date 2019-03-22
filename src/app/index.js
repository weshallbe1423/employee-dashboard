
const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./root/config/DB');

const route = require('./root/routes/route');
const app=express();
const port = process.env.PORT || 4000;




//connection
//mongoose.connect('mongodb://localhost:27017/employeeDetails');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database'+ err)}
);


//on success
mongoose.connection.on('connect',()=>{

    console.log('connected to database on port 27017 ');
})
//on error
mongoose.connection.on('error',(err)=>{
 if(err){
console.log('database connection error....',err);
    }
});
/*
app.get('/register',(req,res)=>{
res.send("Test Successful!!!!!");
});*/
//body parser
app.use(bodyParser.json());
app.use(cors());
app.listen(port, function(){
console.log('Listening on port ' + port);
});

//routes
app.use('/api',route);



 /* 
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
  }));
app.all(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); 
*/