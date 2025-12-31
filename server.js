import express from 'express';
import { connectDB } from './src/config/db';
import dotenv from 'dotenv';

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});