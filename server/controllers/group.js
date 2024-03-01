import Grup  from '../models/group.js'
import mongoose from 'mongoose';


const getPosts=async (req,res)=>{

    try {
        const postMessage=await Grup.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const CreatePost = async (req, res) => {
    const post = req.body;
  
    const newPost = new Grup({ ...post });
  
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  

const Delete=async (req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id))  res.status(404).send('Post silindi') 
  await Grup.findByIdAndRemove(_id);
  res.status(200).json({message:'post silindi'})
  
  }
  const Detay=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await Grup.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const duzenle=async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("post bulunamadı")
  
    const guncelPost=await Grup.findByIdAndUpdate(_id,post,{new:true});
    res.status(200).json(guncelPost)
}


export {
    getPosts,
    CreatePost,
    Delete,
    Detay,
    duzenle
}