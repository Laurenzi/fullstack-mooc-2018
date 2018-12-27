import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'


describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders only the login form when user is not logged in', () => {
    app.update()
    const blogComponents = app.find(Blog)
    const loginForm = app.find(LoginForm)
    expect(loginForm).not.toBe(null)
    expect(blogComponents).toEqual(undefined)
  })

  it('doesn\'t render the blog form when user is logged in and renders the blogs', () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    app.update()
    const blogComponents = app.find(Blog)
    const loginFormDiv = app.find('.login-form')
    expect(loginFormDiv.getElement().props.style).toEqual({ display: 'none' })
    localStorage.setItem('loggedBlogAppUser', null)
  })

})