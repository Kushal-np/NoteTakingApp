import express from 'express';
import { createNote, deleteNote, readNote, updateNote } from '../controllers/note.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/create-note", authMiddleware, createNote);

router.get("/read-note", authMiddleware, readNote);

router.put("/update-note/:id", authMiddleware, updateNote);

router.delete("/delete-note", authMiddleware, deleteNote); // remove trailing space

export default router;
