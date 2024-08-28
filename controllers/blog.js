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