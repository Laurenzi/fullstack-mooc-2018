import React from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const blog = this.props.blog
    const handleLike = this.props.handleLike
    const handleRemove = this.props.handleRemove
    const renderDelete = this.props.renderDelete
    return (
      <div>
        <div className='blog-title-and-author' style={blogStyle} onClick={this.toggleShow}>
          {blog.title} {blog.author}
        </div>
        {this.state.show ? (
        <div>
          <div className='blog-url'>
            {blog.url}
          </div>
          <div className='blog-likes'>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </div>
          <div className='blog-author'>
            added by {blog.user.name}
          </div>
          {renderDelete ? <button onClick={handleRemove}>Delete</button> : null}
        </div>)
          : null}
      </div>
      )
  }
}

Blog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  renderDelete: PropTypes.bool.isRequired
}

export default Blog