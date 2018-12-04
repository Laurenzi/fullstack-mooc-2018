const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeAll(async () => {
  await Blog.remove({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body).toEqual(initialBlogs)
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

test('trying to create a blog without url or title returns with status 400', async () => {
  const blogObject = {
    author: 'Risto Reipas',
    likes: 1919
  }

  const response = await api
    .post('/api/blogs/').send(blogObject)

  expect(response.status).toBe(400)

})

afterAll(() => {
  server.close()
})