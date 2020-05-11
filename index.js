//jshint esversion :6;
const mongoose=require("mongoose");
const express=require("express");
const customers=require("./routes/customers")
const genres=require("./routes/genres")
const movies=require("./routes/movies")
const users=require("./routes/users");
const auth=require("./routes/auth");
const rentals=require("./routes/rentals");
const config=require("config");

const app=express();

if(!config.get("jwtPrivateKey")){

 console.error("FATAL ERROR: jwtPrivateKey is not defined");

 process.exit(1)
 

}

mongoose.set('useCreateIndex', true)


mongoose.connect("mongodb://localhost/viddly",{useUnifiedTopology: true,useNewUrlParser: true})
      // .then(()=>console.log("connected to mongodb"))
      // .catch((err)=>console.log("could not connect to mongodb"));


app.use(express.json());
app.use("/api/genres/", genres)
app.use("/api/movies/", movies)
app.use("/api/customers/", customers)
app.use("/api/users", users);
app.use("/api/auth/", auth);
app.use("/api/rentals/", rentals);



const port=process.env.port||3000;

app.listen(port, ()=>{  console.log("Felix my man here is port 3000");
});