import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
    .then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const replace = (existingObject) => {
    return axios.put(`${baseUrl}/${existingObject.id}`, existingObject)
    .then(response => response.data)
}

export default {getAll, create, remove, replace}