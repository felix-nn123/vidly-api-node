const express=require("express");
const router=express.Router();
const {Validate,Movie}=require("../models/movie");
const auth=require("../middleware/auth")
const admin=require("../middleware/admin")
const {Genre}=require("../models/genre");

   
   router.get("/", async (req, res)=> { 
    
    const movies=await Movie.find().sort("name");

    res.send(movies)
    
    });
   
   router.post("/", auth , async (req,res)=>{   
   
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const genre=await Genre.findById(req.body.genreId);
     if(!genre) res.status(400).send("Invalid genreId")

     let movie=new Movie({

       title:req.body.title,
       genre:{
           _id:genre._id,
           name:genre.name

       },
       numberInStock:req.body.numberInStock,
       dailyRentalRate:req.body.dailyRentalRate
      

     })
   
     movie =await  movie.save()
   
     res.send(movie)
   
   })
   
   router.put("/:id",async (req,res)=>{
   
     // const Movie=Movies.find(c=>c.id===parseInt(req.params.id));
     
     
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
     
     //  Movie.name=req.body.name
     const movie=await Movie.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true});
      if(!movie) return res.status(404).send("the Movie with the given ID does'nt exist");
     
      res.send(movie);
   
   })
   
   router.delete("/:id",[auth,admin],async (req, res)=>{

    const movie= await Movie.findByIdAndRemove(req.params.id);
   
  //  const Movie=Movies.find(c=>c.id===parseInt(req.params.id));
   if(!movie) return res.status(404).send("the Movie of the given ID does'nt exist");
   
  //  const index=Movies.indexOf(Movie);
   
  //  Movies.splice(index, 1)
   
   res.send(movie) 
   
   });

   router.get("/:id",async (req, res)=>{

   const movie=await Movie.findById(req.params.id)

    if(!movie) return res.status(404).send("the Movie of the given ID does'nt exist")

    res.send(movie)

   })
   

   module.exports=router;

