import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: null,
      notification: null,
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    this.setState({user})
    blogService.setToken(user.token)
  }
  }

  handleLoginFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleNewBlogFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    this.setState( { user: null } )
  }

  newBlog = async (event) => {
    event.preventDefault()
    console.log("Yritetään lisätä blogia")
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    const createdBlog = await blogService.create(blogObject)
    createdBlog.id = createdBlog._id
    delete createdBlog._id
    createdBlog.user = this.state.user
    console.log('createdBlog:', createdBlog)
    this.setState( {notification: `a new blog '${blogObject.title}' by ${blogObject.author} was added`, title: '', author: '', url: '', blogs: this.state.blogs.concat(createdBlog)} )
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  removeBlog = (blogToRemove) => {
    return async () => {
      console.log('Yritetään poistaa blogia', blogToRemove)
      const result = await blogService.remove(blogToRemove)
      const newBlogs = this.state.blogs.filter(blog => blog.id !== blogToRemove.id)
      this.setState({ blogs: newBlogs, notification: `removed blog ${blogToRemove.title} by ${blogToRemove.author}`})
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    }
  }

  updateLikes = (blogToUpdate) => {
    return async () => {
      console.log('Yritetään päivittää blogin tykkäyksiä', blogToUpdate)
      const blogs = this.state.blogs
      const result = await blogService.update({...blogToUpdate, likes: blogToUpdate.likes + 1} )
      const newBlogs = blogs
        .map(blog => blog.id == blogToUpdate.id ? {...blog, likes: blog.likes + 1} : blog)
      this.setState( {blogs: newBlogs, notification: `updated likes of blog ${blogToUpdate.title} by ${blogToUpdate.author}`})
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    }
  }
  

  render() {

    const blogsToShow = [...this.state.blogs].sort((a, b) => b.likes - a.likes)
    console.log('Sortatut blogit:', blogsToShow)

    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }


      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div className='login-form' style={showWhenVisible}>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }

    const blogForm = () => (
      <Togglable buttonLabel="new blog">
        <BlogForm
          handleSubmit={this.newBlog}
          handleChange={this.handleNewBlogFieldChange}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
        />
      </Togglable>
    )

    return (
      <div>
        <h1>Blogs</h1>

        <Notification message={this.state.error}/>
        <Notification message={this.state.notification}/>

        {this.state.user === null ?
          loginForm() :
          <div>
           {this.state.user.username} logged in.
            <button onClick={this.logout}>log out</button>
            {blogForm()}
        </div>
        }
          
        <h2>Blogs</h2>
        {blogsToShow.map(blog => 
          <Blog key={blog.id}
            blog={blog}
            handleLike={this.updateLikes(blog)}
            handleRemove={this.removeBlog(blog)}
            renderDelete={this.state.user == null ? false : (this.state.user.name ? this.state.user.name === (blog.user.name) : false)}
          />
        )}
      </div>
    );
  }
}

export default App;
