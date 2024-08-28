const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    likedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
    }
});

module.exports = mongoose.model('like',likeSchema);