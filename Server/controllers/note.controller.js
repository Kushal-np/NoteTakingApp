import Note from "../model/note.model.js";

export const createNote = async (req, res) => {
  try {
    console.log("User in createNote:", req.user); // 👀 Check this
    const { title, content, tags } = req.body;
console.log("Creating note with userId:", req.user.id);

    const note = await Note.create({
      title,
      content,
      tags,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating note",
      error: error.message
    });
  }
};
import mongoose from "mongoose";

export const readNote = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: new mongoose.Types.ObjectId(req.user.id),
    });
    console.log("Found notes:", notes);
    res.json(notes);
  } catch (error) {
    return res.status(501).json({
      error: "Error fetching notes",
      details: error.message,
    });
  }
};

export const updateNote = async(req , res) =>{
    try{
    const {id} = req.params;
    const note = await Note.findOneAndUpdate({
        _id:id , 
        userId:req.user.id
    },
    req.body , 
    {new:true}
)
    if(!note){
        return res.status(404).json({
            error:"Not found " 
        })
    }    
    res.status(201).json({
        note 
    })
    }
catch(error){
    res.status(500).json({
        error:"Error updating note"
    })
}
}

export const deleteNote = async(req , res)=>{
    try{
        const {id} = req.params ; 
        const note = await Note.findOneAndDelete({_id:id,userId:req.user.id})
        console.log(note)
        if(!note){
            return res.status(404).json({
                error:"Note not found"
            })
        }
        else{
            res.json({
                message:"Note deleted"
            })
        }

    }
    catch(error){   
        res.status(500).json({
            error:"Error deleting note"
        })
    }
}