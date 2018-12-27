let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: 'Easy bloggin',
    author: 'Pera perusjäbä',
    url: 'http://pera.com',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: 'Easy bloggin2',
    author: 'Pera perusjäbä',
    url: 'http://pera.com',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: 'Easy bloggin3',
    author: 'Pera perusjäbä',
    url: 'http://pera.com',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }