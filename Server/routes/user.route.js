import express from 'express';
import { loginUser, logout, registerUser } from '../controllers/user.controller.js';
const router = express.Router();

router.post("/signup" , registerUser)
router.post("/login" , login)
router.post("/logout" , logout)

export default router;