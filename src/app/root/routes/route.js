const express= require('express');
const router=express.Router();
const Register=require('../models/register');

//retreiving data
router.get('/register',(req,res,next)=>{
    Register.find(function(err,register){
       res.json(register)
    })
   
});


router.get('/register/:id',(req,res,next)=>{
Register.findById({_id: req.params.id},(err,result)=>{
    if(err){
        res.json(err);
    }else{
        res.json(result);
    }
  
})
});

//adding data

router.post('/register',(req,res,next)=>{
    var regi=new Register({
        email:req.body.email,
        password:req.body.password,
        mobile:req.body.mobile
    })
    regi.save()
    .then(regi => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

//delete data
router.delete('/register/:id',(req,res,next)=>{
Register.findByIdAndDelete({_id: req.params.id},(err,result)=>{
    if(err){
        res.json(err);
    }else{
        res.json(result);
    }
  
})
});
//update data
router.put('/register/:id',(req,res,next)=>{
    console.log("update registered user");
    Register.findByIdAndUpdate(req.params.id,
        {
        $set:{email:req.body.email,
            password:req.body.password,
            mobile:req.body.mobile
        }
    },
    {new :true},
    function(err,Register){
        if(err){
            res.send("Error in update");
        }else{
            res.json(Register);
            console.log(Register);
        }
    })
  
});

 

module.exports=router;