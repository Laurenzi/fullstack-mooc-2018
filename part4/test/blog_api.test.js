const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, format, nonExistingId} = require('../test/test_helper')

describe('When there are initially some blogs saved', async () => {

  beforeAll(async () => {
    await Blog.remove({})
  
    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blogs are returned as json by GET /api/blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(initialBlogs)
  })

  test('single blog can be returned as json by GET /api/blogs/:id', async () => {
    const blogsInDatabase = await  blogsInDb()
    const aBlogId = blogsInDatabase[0].id
    
    const response = await api
      .get(`/api/blogs/${aBlogId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual( initialBlogs[0])
  })

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const validNonexistingId = await  nonExistingId()

    const response = await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    const response = await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
  
})

describe('Addition of a new blog', async () => {

  test('a blog created without likes will have 0 likes', async () => {
    const blogObject = {
      title: 'Paranoidi Optimisti2',
      author: 'Risto Siilasmaa',
      url: 'http://ristosiilasmaa.com',
    }
    const response = await api
      .post('/api/blogs').send(blogObject)
  
    const expected = await Blog.findOne({_id: response.body._id})
  
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({title: 'Paranoidi Optimisti2', author: 'Risto Siilasmaa', url: 'http://ristosiilasmaa.com', likes: 0})
    expect(expected).toMatchObject({title: 'Paranoidi Optimisti2', author: 'Risto Siilasmaa', likes: 0, url: 'http://ristosiilasmaa.com'})
  })

  test('a blog can be added via post', async () => {
    const blogObject = {
      title: 'Paranoidi Optimisti1',
      author: 'Risto Siilasmaa',
      url: 'http://ristosiilasmaa.com',
      likes: 1000,
    }
    const response = await api
      .post('/api/blogs').send(blogObject)
    expect(response.body).toMatchObject(blogObject)
  })

  test('trying to create a blog without url or title returns with status 400', async () => {
    const blogObject = {
      author: 'Risto Reipas',
      likes: 1919
    }

    const response = await api
      .post('/api/blogs/').send(blogObject)

    expect(response.status).toBe(400)

  })

})

describe('Deletion of a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'poista minut pyynnöllä HTTP DELETE',
      url: 'https://delete'
    })
    await addedBlog.save()
  })

  test('DELETE to /api/blogs/:id works with proper statuscode', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()
    console.log('blogsAfterOperation:', blogsAfterOperation)
    console.log('blogsAtStart:', blogsAtStart)
    const content = blogsAfterOperation

    expect(content).not.toContain(addedBlog)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })

})

afterAll(() => {
  server.close()
})