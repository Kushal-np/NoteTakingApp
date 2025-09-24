import mongoose from 'mongoose'

export const connectDB = async(req , res) =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("we are here now")
    }
    catch(error){
        return res.status(404).json({
            success:false , message:error.message
        })
    }
}

export default connectDB;