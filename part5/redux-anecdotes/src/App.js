import React from 'react';


const getId = () => (100000*Math.random()).toFixed(0)

class App extends React.Component {
  handleVote = (anecdote) => {
    return () => {
     this.props.store.dispatch({type: 'VOTE', id: anecdote.id})
    }
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const id = getId()
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE', 
      content,
      id
    })
    event.target.anecdote.value = ''
  }

  render() {
    let anecdotes = this.props.store.getState()
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default App