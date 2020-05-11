const Joi=require("joi");
const mongoose=require("mongoose");



const Customer=mongoose.model("Customer", new mongoose.Schema({

    isGold:{
        type:Boolean,
        required:true,
        default:false
    },
    name:{
         type:String,
         required:true,
         minlength:5,
         maxlength:50
    
    },
    phone:{  
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    
    }
    
    
    }));

    function validateCustomer(customer){
   
        const schema={
       
         name:Joi.string().min(5).max(50).required(),
         isGold:Joi.boolean().required(),
         phone:Joi.string().min(5).max(50).required()
       
        }
       
       return Joi.validate(customer, schema);
       }
   
       exports.Customer=Customer;
       exports.Validate=validateCustomer;