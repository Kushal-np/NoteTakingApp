import express from 'express';
import {  getCurrentUser, login, logout, registerUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/signup" , registerUser)
router.post("/login" , login)
router.post("/logout" , logout)
router.get("/me" , authMiddleware , getCurrentUser)

export default router;