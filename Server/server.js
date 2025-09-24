import express from 'express';
import dotenv from 'dotenv'
import authRoutes from "./routes/user.route.js"
import noteRoutes from "./routes/note.route.js"
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT ; 
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRoutes)
app.use("/api/note" , noteRoutes)


app.listen(PORT , ()=>{
    console.log(`Server running on the port ${PORT}`)
    connectDB();
})