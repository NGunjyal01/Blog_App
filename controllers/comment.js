const Comment = require('../models/comments');
const Blog = require('../models/blog');

exports.createComment = async(req,res)=>{
    try{
        const{commentedBy,comment,blogId} = req.body;
        const savedComment = await Comment.create({commentedBy,comment,blogId});
        const updatedBlog = await Blog.findByIdAndUpdate(blogId,{$push:{comments: savedComment._id}},{new:true})
        .populate({
            path: 'comments',
            populate: {
                path: 'commentedBy',
                model: 'user',
            }
        })
        .exec();
        return res.status(200).json({
            data:updatedBlog,
            success:true,
            message:"Successfully Commented on blog"
        })
    }
    catch(error){
        console.log("ERROR DURING CREATE COMMENT.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.editComment = async(req,res)=>{
    try{
        const{commentId,comment,blogId} = req.body;
        const editedComment = await Comment.findByIdAndUpdate(commentId,{comment});
        const updatedBlog = await Blog.findByIdAndUpdate({_id:blogId,"comments._id":editedComment._id},{$set:{comment: comment}},{new:true})
        .populate({
            path: 'comments',
            populate: {
                path: 'commentedBy',
                model: 'user',
            }
        })
        .exec();
        return res.status(200).json({
            data:updatedBlog,
            success:true,
            message:"Successfully Edited Commented blog"
        })
    }
    catch(error){
        console.log("ERROR DURING EDIT COMMENT.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.deleteComment = async(req,res)=>{
    try{
        const{commentId,comment,blogId} = req.body;
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        const updatedBlog = await Blog.findByIdAndUpdate(blogId,{$pull:{comments:commentId}},{new:true})
        .populate({
            path: 'comments',
            populate: {
                path: 'commentedBy',
                model: 'user',
            }
        })
        .exec();
        return res.status(200).json({
            data:updatedBlog,
            success:true,
            message:"Successfully Edited Commented blog"
        })
    }
    catch(error){
        console.log("ERROR DURING DELETE COMMENT.............",error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}