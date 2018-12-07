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
      return response.status(204).end()
    } else {
      return response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    return response.status(400).send( {error: 'unknown error'} )
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url
    }
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, {new: true})
    
    if (updatedBlog) {
      return response.status(204).send(updatedBlog)
    } else {
      return response.status(404).send({ error: 'blog not found'})
    }
  } catch (exception) {
    return response.status(400).send({ error:'unknown error' })
  }
})

module.exports = blogsRouter