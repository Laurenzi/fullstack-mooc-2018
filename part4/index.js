const http = require('http')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

const mongoUrl = config.mongoUrl
const port = config.port

mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to database", mongoUrl)
  })
  .catch(error => {
    console.error(error)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.logger)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}