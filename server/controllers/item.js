import Item  from '../models/item.js'
import mongoose from 'mongoose';


const getPosts=async (req,res)=>{

    try {
        const postMessage=await Item.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const CreatePost = async (req, res) => {
    const post = req.body;
  
    const newPost = new Item({ ...post, createdAt: new Date() });
  
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
  await Item.findByIdAndRemove(_id);
  res.status(200).json({message:'post silindi'})
  
  }
  const Detay=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await Item.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


export {
    getPosts,
    CreatePost,
    Delete,
    Detay
}