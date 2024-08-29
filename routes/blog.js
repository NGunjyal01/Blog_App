const express = require('express');
const { createBlog, updateBlog, deleteBlog, getAllBlogs } = require('../controllers/blog');
const { likeBlog, unLikeBlog } = require('../controllers/like');

const blogRouter = express.Router();

blogRouter.get('/getAll',getAllBlogs);
blogRouter.post('/create',createBlog);
blogRouter.post('/update/:id',updateBlog);
blogRouter.post('/delete/:id',deleteBlog);
blogRouter.post('/like',likeBlog);
blogRouter.post('/unlike',unLikeBlog);

module.exports = blogRouter;