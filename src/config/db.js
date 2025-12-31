// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {}



import  mongoose from 'mongoose'
// install mongoose package and connected to the database
export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected successfully')
    }
    catch(error){
        console.error('error:' + error)
        process.exit(1) // exit with failure
    }
}