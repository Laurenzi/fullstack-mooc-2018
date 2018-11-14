import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '050-123456' }
      ],
      newName: '',
      newNumber: '',
      nameFilter: ''
    }
  }

  handleNameChange = (event) => {
  console.log(event.target.value)
  this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleNameFilterChange = (event) => {
    this.setState({nameFilter: event.target.value})
  }

  addPerson = (event) => {
    event.preventDefault()

    if (!this.state.persons.map(person => person.name).includes(this.state.newName)) {
      const personObject = {
        name:  this.state.newName,
        number: this.state.newNumber
      }
      const persons = this.state.persons.concat(personObject)
      this.setState({persons, newName: '', newNumber: '', nameFilter: this.state.nameFilter})
    }
  }

  render() {
    const personsToShow = this.state.nameFilter === '' ? this.state.persons
    : this.state.persons
      .filter(person => person.name.toLowerCase().includes(this.state.nameFilter))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        rajaa näytettäviä: <input value={this.state.nameFilter} onChange={this.handleNameFilterChange}/>
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h3>Numerot</h3>
        {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    )
  }
}

export default App