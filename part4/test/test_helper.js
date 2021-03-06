const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    _id: '5c09f94bbda2ab3741db9e35',
    username: '123456',
    name: 'Mystery Man',
    passwordHash: bcrypt.hashSync('testipassu', 10)
  },
  {
    _id: '5c09f94bbda2ab3741db9e36',
    username: 'admin',
    name: 'Ragnar Gundir',
    passwordHash: bcrypt.hashSync('testipassuja', 10)
  }
]

const formatBlog = (blog) => {
  return {
    author: blog.content,
    title: blog.important,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

const formatUser = (user) => {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs,
    id: user._id
  }
}

const blogsInDb = async () => {
  return await Blog.find({})
}

const usersInDb = async () => {
  return await User.find({})
}

const nonExistingId = async () => {
  const blog = new Blog({title: 'aa', author:'öö', url:'exists'})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}




module.exports =  { initialBlogs, initialUsers, formatBlog, formatUser, blogsInDb, usersInDb, nonExistingId }