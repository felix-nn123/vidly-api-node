const express=require("express");
const router=express.Router();
const {Validate,Genre}=require("../models/genre");
const auth=require("../middleware/auth")
const admin=require("../middleware/admin")

   
   router.get("/", async (req, res)=> { 
    
    const genres=await Genre.find().sort("name");

    res.send(genres)
    
    });
   
   router.post("/", auth , async (req,res)=>{   
   
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let genre=new Genre({

       name:req.body.name,
      

     })
   
     genre =await  genre.save()
   
     res.send(genre)
   
   })
   
   router.put("/:id",async (req,res)=>{
   
     // const genre=genres.find(c=>c.id===parseInt(req.params.id));
     
     
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
     
     //  genre.name=req.body.name
     const genre=await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true});
      if(!genre) return res.status(404).send("the genre with the given ID does'nt exist");
     
      res.send(genre);
   
   })
   
   router.delete("/:id",[auth,admin],async (req, res)=>{

    const genre= await Genre.findByIdAndRemove(req.params.id);
   
  //  const genre=genres.find(c=>c.id===parseInt(req.params.id));
   if(!genre) return res.status(404).send("the genre of the given ID does'nt exist");
   
  //  const index=genres.indexOf(genre);
   
  //  genres.splice(index, 1)
   
   res.send(genre) 
   
   });

   router.get("/:id",async (req, res)=>{

   const genre=await Genre.findById(req.params.id)

    if(!genre) return res.status(404).send("the genre of the given ID does'nt exist")

    res.send(genre)

   })
   

   module.exports=router;





   