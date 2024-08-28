const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like',
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    }],
    createdAt:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedAt:{
        type: Date,
        required: true,
        default: Date.now(),
    }
})

module.exports = mongoose.model('blog',blogSchema);