const express=require("express");
const router=express.Router();
const {Customer,Validate}=require("../models/customer")


   
   router.get("/", async (req, res)=> { 
    
    const customers=await Customer.find().sort("name");

    res.send(customers)
    
    });
   
   router.post("/",async (req,res)=>{   
   
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let customer=new Customer({

       name:req.body.name,
       isGold:req.body.isGold,
       phone:req.body.phone

     })
   
     customer =await  customer.save()
   
     res.send(customer)
   
   })
   
   router.put("/:id",async (req,res)=>{
   
     // const genre=genres.find(c=>c.id===parseInt(req.params.id));
     
     
     const {error}=Validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
     
     //  genre.name=req.body.name
     const customer=await Customer.findByIdAndUpdate(req.params.id, {
                                     name:req.body.name,
                                     isGold:req.body.isGold,
                                     phone:req.body.phone
                                                               
                                    },{new:true});
      if(!customer) return res.status(404).send("the customer with the given ID does'nt exist");
     
      res.send(customer);
   
   })
   
   router.delete("/:id",async (req, res)=>{

    const customer= await Customer.findByIdAndRemove(req.params.id);
   
  //  const customer=customers.find(c=>c.id===parseInt(req.params.id));
   if(!customer) return res.status(404).send("the customer of the given ID does'nt exist");
   
  //  const index=customers.indexOf(customer);
   
  //  customers.splice(index, 1)
   
   res.send(customer) 
   
   });

   router.get("/:id",async (req, res)=>{

   const customer=await Customer.findById(req.params.id)

    if(!customer) return res.status(404).send("the customer of the given ID does'nt exist")

    res.send(customer)

   })
   
   

   module.exports=router;