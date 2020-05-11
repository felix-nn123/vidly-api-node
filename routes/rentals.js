const express=require("express");
const router=express.Router();
let Fawn=require("fawn");
const {Validate,Rental}=require("../models/rental");
const {Customer}=require("../models/customer");
const {Movie}=require("../models/movie");
const mongoose=require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/testDB");


 Fawn.init(mongoose)

   
   router.get("/", async (req, res)=> { 
    
    const rentals=await Rental.find().sort("-dateOut");

    res.send(rentals)
    
    });
   
   router.post("/", async (req,res)=>{   
   
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const customer=await Customer.findById(req.body.customerId);
     if(!customer) res.status(400).send("Invalid customerID");

     const movie=await Movie.findById(req.body.movieId)
     if(!movie) return res.status(400).send("Invalid Movie");

     if(movie.numberInStock===0) return res.status(400).send("Movie not in stock")

     let rental=new Rental({

      customer:{
          _id:customer._id,
          name:customer.name,
          phone:customer.phone

      },
      movie:{

       _id:movie._id,
       title:movie._title,
       dailyRentalRate:movie.dailyRentalRate

      }
      

     })

 

      await new Fawn.Task()
                .save("rental",rental)
                .update("movie",{_id:movie._id}, {

                    $inc:{numberInStock:-1}
                })
                .run()
                .then(function(result){
                    var firstUpdateResult = result[0].ops;
                    console.log(firstUpdateResult);
                    
                })
                .catch(function(err){

                    console.log(err);

                })
        res.send(rental)
         
  

        // res.status(500).send("something fail")
         
 
   })
   
  

   module.exports=router;
