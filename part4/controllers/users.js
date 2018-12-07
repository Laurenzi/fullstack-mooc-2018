const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    return response.send(users)
  } catch (exception) {
    return response.status(400).send({ error: 'unknown error' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.password || body.password.length < 3) {
      return response.status(400).send({ error: 'password must be at least 3 characters long' })
    }

    const userWithSameUsername = await User.findOne({username: body.username})
    if (userWithSameUsername) {
      return response.status(400).send({ error: 'username is already taken'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: body.adult == undefined || body.adult == null ? true : body.adult
    })

    const result = await user.save()
    const returnedUserObject = {
      _id: result.id,
      username: result.username,
      name: result.name,
      adult: result.adult
    }
    return response.status(201).send(returnedUserObject)
  } catch (exception) {
    return response.status(400).send({ error: 'unknown error' })
  }
})

module.exports = usersRouter

