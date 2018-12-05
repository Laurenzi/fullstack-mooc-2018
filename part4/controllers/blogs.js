const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
    return response.json(blogs)
  } catch(exception) {
    console.log(exception)
    response.status(400).send({ error: 'unknown error' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findOne({ _id: request.params.id })
    if (blog) {
      return response.status(200).json(blog)
    } else {
      return response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformed id' })
  }
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
      return response.status(400).send({ error: error })
    }
    const result = await blog
      .save()
    return response.status(201).json(result)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'virhe'} )
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.param.id
    console.log('poistetaan seuraavalla id:lla:', id)
    const blog = await Blog.findOne({ _id: request.params.id })
    if (blog) {
      await Blog.deleteOne(blog)
      response.status(204).end()
    } else {
      return response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send( {error: 'unknown error'} )
  }
})

module.exports = blogsRouter