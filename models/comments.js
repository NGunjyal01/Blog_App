const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    comment:{
        type:String,
        required: true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'blog',
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now(),
    }
});

module.exports = mongoose.model('comment',commentSchema);