const express = require('express');
const { createBlog } = require('../controllers/blog');
const { likeBlog, unLikeBlog } = require('../controllers/like');

const blogRouter = express.Router();

blogRouter.post('/create',createBlog);
blogRouter.post('/like',likeBlog);
blogRouter.post('/unlike',unLikeBlog)

module.exports = blogRouter;