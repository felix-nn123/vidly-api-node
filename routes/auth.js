
const express=require("express");
const router=express.Router();
const _=require("lodash");
const {User }=require("../models/user");
const bcrypt=require("bcrypt");
const Joi=require("joi")
const jwt =require("jsonwebtoken");
const config=require("config")

   
   router.post("/",async (req,res)=>{   
   
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let user=await User.findOne({email:req.body.email});
     if(!user) return res.status(400).send("Invalid email or password")

     const validPassword=await bcrypt.compare(req.body.password, user.password);
     if(!validPassword) return res.status(400).send("Invalid email is password");

    // const token =jwt.sign({_id:user._id}, config.get("jwtPrivateKey"))
    const token=user.generateAuthToken()

    res.send(token)
   
   })

   function Validate(req){
   
    const schema={
   
     email:Joi.string().email().min(5).max(255).required(),
     password:Joi.string().min(5).max(1025).required()
   
    }
   
   return Joi.validate(req, schema);
   }
   
   module.exports=router;