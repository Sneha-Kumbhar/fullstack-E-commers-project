const User = require('../model/userModel')

const bcrypt=require('bcrypt')

exports.allUser=async(req,res)=>{
    try {
        const user=await User.find()
        res.status(200).json(user)
    } catch (error) {

        res.status(400).json({message:'error'})
        
    }
}
exports.addUser=async(req,res)=>{
    const{name,email,role,DOB,nationality,contact,eaddress}=req.body
    try {
       
        const user=await User.create({name,email,role,DOB,nationality,contact,eaddress})
        res.status(201).json({message:"user has been created"})
    } catch (error) {
        res.status(400).json({message:error})

        
    }
}

exports.editUser=async(req,res)=>{
    const{name,email,role}=req.body
    const{id}=req.params
    try {
       
        const user=await User.findByIdAndUpdate(id,{name,email,role})
        res.status(201).json({message:"user has been edited "})
    } catch (error) {
        res.status(400).json({message:error})

        
    }
} 

exports.deleteUser=async(req,res)=>{
   
    const{id}=req.params
    try {
       
        const user=await User.findByIdAndDelete(id)
        res.status(201).json({message:"user has been deleted"})
    } catch (error) {
        res.status(400).json({message:error})

        
    }
} 


