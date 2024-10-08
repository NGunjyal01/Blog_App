
const bcrypt = require("bcrypt");
const User = require('../models/user');

exports.createUser = async(req,res)=>{
    try{
        const {firstName,lastName,email,password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(200).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: "Email Already Exists",
            });
        }

        const hashPassword = await bcrypt.hash(password,10);
        if(!hashPassword){
            return res.status(200).json({
                success: false,
                message: "Error During Password Hashing",
            });
        }
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            imageUrl: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        });
        return res.status(200).json({
            data: user,
            success:true,
            message:"User Created Successfully",
        });
    }
    catch(error){
        console.error("ERROR DURING CREATE USER...........",error);
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        })
    }
}

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;

    const existingUser = await findOne({email});
    if(!existingUser){
        return res.status(200).json({
            success:false,
            message:"User Not Found",
        })
    }
    if(await bcrypt.compare(password,existingUser.password)){
        
    }
    
}
