import Note from "../model/note.model";

export const createNote = async(req , res) =>{
    try{
        const {title , content , tags} = req.body;
        const note = await Note.create({
            title , 
            content , 
            tags
        })
    }
    catch(error){

    }
}

export const readNote = async(req, res)=>{

}

export const updateNote = async(req , res) =>{

}

export const deleteNote = async(req , res)=>{

}