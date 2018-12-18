import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'TDD Rocks!',
      author: 'Sharmak Karmak',
      likes: 10
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.blog-content')
    const likesDiv = blogComponent.find('.blog-likes')


    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('calls like handler two times when the like button is clicked twice', () => {
    const blog = {
      title: 'TDD Rocks!',
      author: 'Sharmak Karmak',
      likes: 10
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = blogComponent.find('button')
    button.simulate('click').simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})