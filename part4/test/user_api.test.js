const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { usersInDb } = require('./test_helper')

describe.only('Adding new user', async () => {

  beforeAll(async () => {
    await User.remove({})
    const someUser = {
      username: 'some',
      name: 'Come Get Some',
      passwordHash: '$2b$10$sYP7tOfasFR1CheDIReVzOik4ORySJozZ51BGJ5tvC.4noErpT.bK',
      adult: true,
    }
    await new User(someUser).save()
  })

  const newUser = {
    username: 'santa',
    name: 'Santa Claus',
    password: 'kallekala',
    adult: true,
  }

  test('works when POSTing to /api/users', async () => {
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const expectedUser = {
      username: newUser.username,
      name: newUser.name,
      adult: newUser.adult
    }
    expect(response.body).toMatchObject(expectedUser)

    const usersAfterOperation = await usersInDb()
    const usernamesAfterOperation = usersAfterOperation.map(user => user.username)
    expect(usernamesAfterOperation).toContain(newUser.username)
  })

  test('doesn\'t work with password less than 3 characters and proper error message is returned with status 400', async () => {
    const userWithInvalidPassword = {
      username: 'reimari',
      name: 'Hjalmar Reimar',
      password: 'mo'
    }
  
    const response = await api
      .post('/api/users')
      .send(userWithInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toEqual( {error: 'password must be at least 3 characters long'} )

    const usersAfterOperation = await usersInDb()
    const usernamesAfterOperation = usersAfterOperation.map(user => user.username)
    expect(usernamesAfterOperation).not.toContain(userWithInvalidPassword.username)
  })

  test('doesn\'t work with username already taken and error message is returned with status 400', async () => {
    const userWithNonUniqueUsername = {
      username: 'some',
      name: 'Hjalmar Reimar',
      password: 'morsss'
    }
  
    const response = await api
      .post('/api/users')
      .send(userWithNonUniqueUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toEqual( {error: 'username is already taken'} )
  })
})

afterAll(() => {
  server.close()
})