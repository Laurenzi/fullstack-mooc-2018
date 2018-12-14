import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Title
              <input type="text" value={title}
              onChange={handleChange} name="title"></input>
          </div>
          <div>
            Author
              <input type="text" value={author}
              onChange={handleChange} name="author"></input>
          </div>
          <div>
            Url
              <input type="text" value={url}
              onChange={handleChange} name="url"></input>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
  )
}

BlogForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm