import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      countries: []
    }
  }

  componentDidMount() {
    const endpoint = "https://restcountries.eu/rest/v2/all"
    axios.get(endpoint)
    .then(response => {
      this.setState({countries: response.data})
    })
  }

  handleFilterChange = (event) => {
    const newFilter = event.target.value
    this.setState({filter: newFilter})
  }

  render() {
    const countriesToShow = this.state.filter === '' ? this.state.countries : this.state.countries
      .filter(country => country.name.toLowerCase().includes(this.state.filter))
    return (
      <div>
        <div>Find countries: <input value={this.state.filter} onChange={this.handleFilterChange}/></div>
        {countriesToShow.length === 1 
        ? (<div><h1>{countriesToShow[0].name}</h1>
          <div>capital: {countriesToShow[0].capital}</div>
          <div>population: {countriesToShow[0].population}</div>
          <img src={countriesToShow[0].flag} alt={countriesToShow[0].flag} />
          </div>
        )
        :
        (countriesToShow.length > 10 ? 'too many matches, specify another filter' : countriesToShow.map(country => <div key={country.name}>{country.name}</div>))}
      </div>
    )
  }
}

export default App;
