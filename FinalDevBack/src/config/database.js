const mongoose=require("mongoose");

// Inside database.js
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI); 
};
//mongodb+srv://Vamshi123:<db_password>@cluster0.qkwvz.mongodb.net/
module.exports=connectDB;
// connectDB()
// .then(()=>{
//     console.log("connected successfully");
// })
// .catch((err)=>{
//     console.log("error is occured that is",err);
// });
//IdtNttryDRxVESOH
