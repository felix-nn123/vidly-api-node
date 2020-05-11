const mongoose=require("mongoose");
const Joi=require("joi");
const {genreSchema}=require("./genre");



const Movie=mongoose.model("Movie", new mongoose.Schema({

    title:{
    
      type:String,
      required:true,
       minlength:5,
       maxlength:255,
       trim:true
    
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{

        type:Number,
        require:true,
        max:255,
        min:0
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:10


    }
    
    }));

   
function validateMovie(movie){
   
        const schema={
       
         title:Joi.string().min(5).max(255).required(),
         genreId:Joi.string().required(),
         numberInStock:Joi.number().min(0).max(255).required(),
         dailyRentalRate:Joi.number().min(0).max(10).required()
       
        }
       
       return Joi.validate(movie, schema);
       }

exports.Movie=Movie;
exports.Validate=validateMovie;
       
  