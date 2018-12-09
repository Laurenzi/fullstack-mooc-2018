import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: null,
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
    console.log("login attempt:")
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
    this.setState( {title: '', author: '', url: '', blogs: this.state.blogs.concat(createdBlog)} )
  }

  render() {
    if (this.state.user == null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
          <div>
            Käyttäjätunnus
            <input type="text" value={this.state.username} 
            onChange={this.handleLoginFieldChange} name="username"/>
          </div>
          <div>
            Salasana
            <input type="password" value={this.state.password}
            onChange={this.handleLoginFieldChange} name="password"/>
          </div>
          <button type="submit">Kirjaudu</button>
          </form>
        </div>
      )
    }
    return (
      <div>
        <div>
          {this.state.user.username} logged in.
          <button onClick={this.logout}>log out</button>
        </div>
        <div>
          <h2>Create new</h2>
          <form onSubmit={this.newBlog}>
            <div>
              Title
              <input type="text" value={this.state.title}
              onChange={this.handleNewBlogFieldChange} name="title"></input>
            </div>
            <div>
              Author
              <input type="text" value={this.state.author}
              onChange={this.handleNewBlogFieldChange} name="author"></input>
            </div>
            <div>
              Url
              <input type="text" value={this.state.url}
              onChange={this.handleNewBlogFieldChange} name="url"></input>
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
