import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";        
import postsRoutes from "./routes/postsRoutes.js";
import { connectDB } from "./config/db.js";
import mailer from './config/mailer.js'
import { auth } from "./middlewares/auth.js";

connectDB()
const app = express();
const PORT = process.env.PORT || 5000;



app.use(
  cors({
    origin: "http://localhost:5173", // EXACT frontend URL
    credentials: true
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);


app.get('/test',auth,(req,res)=>{
  res.send('At last' + req.user);
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});