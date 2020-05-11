const mongoose=require("mongoose");
const Joi=require("joi");

//we create a new Customer schema here because using the one that was create
//will populate our rentals with properties that are not useful for the rentals


const customerSchema=new mongoose.Schema({

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

})

const movieSchema=new mongoose.Schema({

    title:{
    
        type:String,
        required:true,
         minlength:5,
         maxlength:255,
         trim:true
      
      },
      dailyRentalRate:{
          type:Number,
          required:true,
          min:0,
          max:10
  
  
      }


})


const Rental=mongoose.model("Rental", new mongoose.Schema({

    customer:{
        type:customerSchema,
        required:true
    },
    movie:{
       type: movieSchema,
       required:true
    
    },
    dateOut:{
       type:Date,
       required:true,
       default:Date.now

    },

    dateReturn:{

       type:Date

    },
    rentalFee:{

      type:Number,
      min:0

    }
    
    
    }));

   
function validateRental(rental){
   
        const schema={
       
         customerId:Joi.string().required(),
         movieId:Joi.string().required(),
       
        }
       
       return Joi.validate(rental, schema);
       }

exports.Rental=Rental;
exports.Validate=validateRental;
       
  