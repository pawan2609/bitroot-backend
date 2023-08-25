const mongoose =require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.Mongo_url)
//mongoose.connect("mongodb+srv://root:root123@cluster0.9hcblhu.mongodb.net/test")
.then(()=>{
    console.log("Connected to database");
})
.catch((error)=>{
    console.log("Error to Connecting with database "+error);
})


 