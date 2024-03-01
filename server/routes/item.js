import express from "express"
import { getPosts,CreatePost,Delete,Detay} from "../controllers/item.js"

const router=express.Router()

router.get('/panel',getPosts);
router.post('/panel',CreatePost);
router.delete('/panel/:id',Delete);
router.get('/detay/:id',Detay);

export default router;