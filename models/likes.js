const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    likedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
    }
});

module.exports = mongoose.model('like',likeSchema);