const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request)
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  logger,
  error,
  tokenExtractor
}