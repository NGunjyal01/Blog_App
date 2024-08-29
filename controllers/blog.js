const Blog = require('../models/blog');

exports.createBlog = async(req,res)=>{
    try{
        const {authorId,title,description} = req.body;
        if(!authorId || !title || !description){
            return res.status(200).json({
                success:false,
                message:"Fill all fields",
            })
        }
        const blog = await Blog.create({authorId,title,description});
        return res.status(200).json({
            data:blog,
            success:true,
            message:"Successfully created blog",
        })
    }    
    catch(error){
        console.log("ERROR DURING CREATE BLOG.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
};

exports.updateBlog = async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,description} = req.body;
        const blog = await Blog.findByIdAndUpdate({_id:id},{title,description,updatedAt:Date.now()},{new:true});
        return res.status(200).json({
            data:blog,
            success:true,
            message:"Successfully Updated blog",
        })
    }    
    catch(error){
        console.log("ERROR DURING UPDATE BLOG.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.deleteBlog = async(req,res)=>{
    try{
        const {id} = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Successfully Deleted Blog"
        })
    }
    catch(error){
        console.log("ERROR DURING DELETE BLOG.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.getAllBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find({})      
        .populate('authorId') 
        .populate({
            path: 'likes',
            populate: {
                path: 'likedBy',
                model: 'user',
            }
        })
        .exec();
        res.status(200).json({
            data:blogs,
            success:true,
            message:"Successfully Returned all blogs",
        })
    }
    catch(error){
        console.log("ERROR DURING GET ALL BLOG.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}