import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get("/signup" , registerUser)
router.get("/login" , loginUser)

export default router;