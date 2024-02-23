import express from "express"
import { getPosts,CreatePost,Delete,Detay,duzenle} from "../controllers/post.js"

const router=express.Router()

router.get('/panel',getPosts);
router.post('/panel',CreatePost);
router.delete('/panel/:id',Delete);
router.get('/detay/:id',Detay);
router.put('/duzenle/:id',duzenle);
export default router;