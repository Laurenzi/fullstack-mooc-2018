import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'TDD Rocks!',
      author: 'Sharmak Karmak',
      url: 'http://testing.testing',
      likes: 10,
      user: {
        name: 'testiuser',
        username: 'test'
      }
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const titleAndAuthorDiv = blogComponent.find('.blog-title-and-author')
    titleAndAuthorDiv.simulate('click')

    const urlDiv = blogComponent.find('.blog-url')
    const likesDiv = blogComponent.find('.blog-likes')
    const authorDiv = blogComponent.find('.blog-author')
    console.log(urlDiv.debug())
    console.log(likesDiv.debug())
    expect(urlDiv.text()).toContain(blog.url)
    expect(likesDiv.text()).toContain(blog.likes)
    expect(authorDiv.text()).toContain(blog.user.name)
  })

  it('calls like handler two times when the like button is clicked twice', () => {
    const blog = {
      title: 'TDD Rocks!',
      author: 'Sharmak Karmak',
      url: 'http://testing',
      likes: 10,
      user: {
        name: 'testiuser',
        username: 'test'
      }
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} handleLike={mockHandler} />)
    const titleAndAuthorDiv = blogComponent.find('.blog-title-and-author')
    titleAndAuthorDiv.simulate('click')
    const button = blogComponent.find('button')
    console.log(button.debug())
    button.simulate('click').simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})