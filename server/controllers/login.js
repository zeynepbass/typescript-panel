import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Yönetici from '../models/yönetici.js'



const yönetici=async (req,res)=>{

    const {email,password}=req.body;

    try {
        const kullanici=await Yönetici.findOne({email})

        if(!kullanici) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const parolaKontrolSonuc=await bcrypt.compare(password,kullanici.password);

        if(!parolaKontrolSonuc) return res.status(400).json({message:'Parolayı doğru giriniz'})

        const token=jwt.sign({email:kullanici.email,id:kullanici._id},'aos-secret-code',{expiresIn:'30d'})

        res.status(200).json({result:kullanici,token})

    } catch (error) {

        res.status(500).json({message:'Bir hata oluştu'})
        
    }
}

export {yönetici };