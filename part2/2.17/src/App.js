import React from 'react'
import personsService from './services/persons'
import Person from './components/Person'
import Filter from './components/Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
      ],
      newName: '',
      newNumber: '',
      nameFilter: ''
    }
  }
  
  componentDidMount() {
    personsService.getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
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
    const personExists = this.state.persons.map(person => person.name).includes(this.state.newName)
    const personObject = {
      name:  this.state.newName,
      number: this.state.newNumber
    }
    if (!personExists) {
      personsService.create(personObject)
      .then(person => {
        const persons = this.state.persons.concat(person)
        this.setState({persons, newName: '', newNumber: '', nameFilter: this.state.nameFilter})
      })
    } else {
      if (window.confirm(`${personObject.name} on jo luettelossa, korvataanko numero uudella?`)) {
        const oldPerson = this.state.persons.find(person => person.name === personObject.name)
        personObject.id = oldPerson.id
        personsService.replace(personObject).then(updatedPerson => {
          const persons = this.state.persons.map(person => person.name === updatedPerson.name ? updatedPerson : person)
          this.setState({persons, newName: '', newNumber: '', nameFilter: this.state.nameFilter})
        })
      }
    }
  }

  deletePerson = (person) => {
    return () => {
      const id = person.id
      console.log(`Yritit poistaa henkilön ID:lla ${id}`)
      const confirmation = window.confirm(`Haluatko varmasti poistaa ${person.name}?`)
      if (confirmation) {
        personsService.remove(id)
        .then(() => {
          const newPersons = this.state.persons.filter(person => person.id !== id)
          this.setState({persons: newPersons})
        })
        .catch((error) => alert(`poisto epäonnistui! Virheviesti: ${error}`))
      }
    }
  }

  render() {
    const personsToShow = this.state.nameFilter === '' ? this.state.persons
    : this.state.persons
      .filter(person => person.name.toLowerCase().includes(this.state.nameFilter))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter value={this.state.nameFilter} onChange={this.handleNameFilterChange}/>
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
        <table>
          <tbody>
            {personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} handleDelete={this.deletePerson(person)}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App