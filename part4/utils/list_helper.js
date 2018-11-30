const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, curr) => {
    return acc + curr
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length == 0) return blogs
  return blogs.reduce((acc, curr) => {
    if (curr.likes > acc.likes) return curr
    return acc
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length == 0) {
    return []
  }
  const authors_and_blogs = blogs.reduce((acc, curr) => {
    if (acc.get(curr.author)) {
      acc.set(curr.author, acc.get(curr.author) + 1)
    } else {
      acc.set(curr.author, 1)
    }
    return acc
  }, new Map())

  const result = Array.from(authors_and_blogs.entries()).reduce((acc, curr) => {
    if (acc[1] > curr[1]) {
      return acc
    } else {
      return curr
    }
  })
  return {author: result[0], blogs: result[1]}
}

const mostLikes = (blogs) => {
  if (blogs.length == 0) {
    return []
  }
  const authors_and_likes = blogs.reduce((acc, curr) => {
    if (acc.get(curr.author)) {
      acc.set(curr.author, acc.get(curr.author) + curr.likes)
    } else {
      acc.set(curr.author, curr.likes)
    }
    return acc
  }, new Map())
  const result = Array.from(authors_and_likes.entries()).reduce((acc, curr) => {
    if (acc[1] > curr[1]) {
      return acc
    } else {
      return curr
    }
  })
  return {author: result[0], likes: result[1]}
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}