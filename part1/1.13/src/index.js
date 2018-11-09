import React from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(anecdotes.length).fill(0)
    }
  }

  randomizeQuote = () => {
    return () => this.setState({selected: getRandomInt(anecdotes.length)})
  }

  vote = (quoteIndex, oldState) => {
    return () => {
      const oldVotes = oldState.votes;
      oldVotes[quoteIndex] = oldVotes[quoteIndex] + 1; // update index
      this.setState({...oldState, votes: oldVotes})
      }
  }

  incrementVote = (vote) => {
    return () => this.setState()
  }

  render() {
    return (
      <div>
        <div>
        {this.props.anecdotes[this.state.selected]}
        </div>
        <div>
          {`Has ${this.state.votes[this.state.selected]} votes.`}
        </div>
        <div>
        <Nappi teksti="Vote" handleClick={this.vote(this.state.selected, this.state)} />
        <Nappi teksti="Next anecdote" handleClick={this.randomizeQuote()} />
        </div>
      </div>
    )
  }
}

const Nappi = ({teksti, handleClick}) => {
  return (
    <button onClick={handleClick}>{teksti}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)