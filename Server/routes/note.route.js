import express from 'express'
import { createNote, deleteNote, readNote, updateNote } from '../controllers/note.controller.js';
const router = express.Router();
import { authMiddleware } from '../middleware/auth.middleware.js';

router.post("/create-note" ,authMiddleware ,   createNote) ; 
router.get("/read-note" ,authMiddleware , readNote);
router.put("/update-note/:id" ,authMiddleware , updateNote) ; 
router.delete("/delete-note/:id " ,authMiddleware , deleteNote) ; 

export default router ;