const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
  return response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    if (!blog.likes) {
      blog.likes = 0
    }
    const error = blog.validateSync()
    if (error) {
      console.log(error)
      return response.status(400).send({error: error})
    }
    const result = await blog
      .save()
    return response.status(201).json(result)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({error: 'virhe'})
  }
}) 

module.exports = blogsRouter