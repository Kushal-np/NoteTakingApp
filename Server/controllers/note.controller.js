import Note from "../model/note.model";

export const createNote = async(req , res) =>{
    try{
        const {title , content , tags} = req.body;
        const note = await Note.create({
            title , 
            content , 
            tags , 
            userId: req.user.id,
        })
        res.status(201).json({
            error:"Error creating the note67"
        })
    }
    catch(error){
        res.status(500).json({
            error:"error creating note"
        })
    }
}

export const readNote = async(req, res)=>{
    try{
        const notes = await Note.find({userId: req.user.id});
        res.json(notes);
    }
    catch(error){
        return res.status(501).json({
            error:"Error fetching notes"
        })
    }
}

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