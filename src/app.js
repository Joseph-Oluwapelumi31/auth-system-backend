import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";        
import postsRoutes from "./routes/postsRoutes.js";
import { connectDB } from "./config/db.js";
import { auth } from "./middlewares/auth.js";

connectDB()
const app = express();
const PORT = process.env.PORT || 5000;



const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://auth-system-frontend-tygq.vercel.app" // Vercel frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);


app.get('/test',(req,res)=>{
  res.send('At last' + req.user);
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});