import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const updateableObject = {
    author: blog.author,
    title: blog.title,
    url: blog.title,
    user: blog.user._id,
    likes: blog.likes
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, updateableObject)
  return response
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (blogObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, create, update, remove, setToken }