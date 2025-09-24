import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await  User.findOne({email});
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


export const login = async(req , res)=>{
    try{
        const {username , password} = req.body;
        const user = User.find({username , password});

        if(!user){
            return res.status(401).json({
                success:false ,
                message:"User already exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false, 
                message:"Invalid error occured"
            })
        }

        const token = jwt.sign({username} , process.env.JWT_SECRET_KEY , {expiresIn:"1h"});

        res.cookie("token",token , {
            httpOnly:true , 
            secure:false , 
            sameSite:"strict" , 
        });

        res.status(201).json({
            success:true, 
            message:"Login successfully"
        })
    }
    catch(error){

    }
}



export const logout = async(req , res) =>{
    res.clearCookie("token");
    res.json({
        message:"Logged out successfully",
    });
}


