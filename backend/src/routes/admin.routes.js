import express from 'express';
import {signup, login, logout  } from '../controllers/admin.controller.js'
import {protectRoute} from '../middleware/admin.middleware.js'
const router = express.Router();



router.post ("/signup", signup)

router.post("/login",login)

router.get("/logout",logout)

router.get("/check" , protectRoute , (req,res) => res.status(200).json(req.user));

export default router