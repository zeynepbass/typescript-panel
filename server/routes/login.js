import express from "express"
import {yönetici } from "../controllers/login.js"

const router=express.Router()

router.post('/admin',yönetici);

export default router;