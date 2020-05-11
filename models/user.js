const mongoose=require("mongoose");
const Joi=require("joi");
const jwt =require("jsonwebtoken");
const config=require("config");


const userSchema= new mongoose.Schema({

    name:{
    
      type:String,
      required:true,
       minlength:5,
       maxlength:50   
    },
    email:{
       type:String,
       required:true,
       unique:true,
       minlength:5,
       maxlength:255

    },
    password:{
    
        type:String,
        required:true,
        minlength:5,
        maxlength:1025

    },
    
    isAdmin:Boolean
    
    })

    userSchema.methods.generateAuthToken=function(){

      const token =jwt.sign({_id:this._id, isAdmin:this.isAdmin}, config.get("jwtPrivateKey"))

      return token;

    }


const User=mongoose.model("User",userSchema);

   
function validateUser(user){
   
        const schema={
       
         name:Joi.string().min(5).max(50).required(),
         email:Joi.string().email().min(5).max(255).required(),
         password:Joi.string().min(5).max(1025).required()
       
        }
       
       return Joi.validate(user, schema);
       }

exports.User=User;
exports.Validate=validateUser;
       
  