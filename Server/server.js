import express from 'express';
import dotenv from 'dotenv'
import authRoutes from "./routes/user.route.js"
import cookieParser from 'cookie-parser';
import connectDB from './model/user.model.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT ; 
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRoutes)


app.listen(PORT , ()=>{
    console.log(`Server running on the port ${PORT}`)
    connectDB();
})