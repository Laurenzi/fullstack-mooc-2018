const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number
})

module.exports = Blog