const Like = require('../models/likes');
const Blog = require('../models/blog');

exports.likeBlog = async(req,res)=>{
    try{
        const {likedBy,blogId} = req.body;
        const like = new Like({likedBy,blogId});
        // const alreadyLiked = await Like.find({likedBy,blogId});
        // if(alreadyLiked){
        //     return res.status(200).json({
        //         success:false,
        //         message:"Blog Already Liked"
        //     })
        // }
        const savedLike = await like.save();
        const updatedBlog = await Blog.findByIdAndUpdate(blogId,{$push:{likes: savedLike._id}},{new:true})
        .populate({
            path: 'likes',
            populate: {
                path: 'likedBy',
                model: 'user',
            }
        })
        .exec();

        return res.status(200).json({
            data:updatedBlog,
            success:true,
            message:"Successfully Liked the blog"
        })
    }
    catch(error){
        console.log("ERROR DURING CREATE BLOG.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.unLikeBlog = async(req,res)=>{
    try{
        const {likedBy,blogId} = req.body;
        // const alreadyLiked = await Like.findOne({likedBy,blogId});
        // console.log(alreadyLiked)
        // if(!alreadyLiked){
        //     return res.status(200).json({
        //         success:false,
        //         message:"Blog Not Liked"
        //     })
        // }
        const deletedLike = await Like.findOneAndDelete({likedBy:likedBy,blogId:blogId});
        const updatedBlog = await Blog.findByIdAndUpdate(blogId,{$pull:{likes: deletedLike._id}},{new:true})
        .populate({
            path: 'likes',
            populate: {
                path: 'likedBy',
                model: 'user',
            }
        })
        .exec();
        return res.status(200).json({
            data:updatedBlog,
            success:true,
            message:"Successfully Unliked the blog"
        })
    }
    catch(error){
        console.log("ERROR DURING CREATE BLOG.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}