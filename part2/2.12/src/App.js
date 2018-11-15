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
        {countriesToShow.map(country => <div key={country.name}>{country.name}</div>)}
      </div>
    )
  }
}

export default App;
