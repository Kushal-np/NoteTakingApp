import express from 'express';
import dotenv from 'dotenv'
import authRoutes from "./routes/user.route.js"
const app = express();
dotenv.config();
const PORT = process.env.PORT ; 
app.use(express.json());
app.use("/api/auth" , authRoutes)


app.listen(PORT , ()=>{
    console.log(`Server running on the port ${PORT}`)
})