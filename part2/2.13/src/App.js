import React, { Component } from 'react';
import axios from 'axios';

import CountryDetails from './components/CountryDetails'

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

  toggleShowDetails = (name) => {
    console.log("Palautetaan toggleShowDetails()", name)
    return () => {
      console.log("suoritetaan toggleShowDetails ", name)
      const newCountryObject = { ...this.state.countries.find(country => country.name === name) }
      newCountryObject.showDetails = !newCountryObject.showDetails
      const newCountries = this.state.countries
      .map(country => country.name === name ? newCountryObject : country)
      console.log("newCountries:", newCountries)
      console.log("Muuttuneen maan indeksi:", this.state.countries.findIndex(country => country.name === name))
      this.setState({countries: newCountries})
    }
      
  }

  render() {
    console.log("render() funktiossa. this.state.countries:", this.state.countries)
    const countriesToShow = this.state.filter === '' ? this.state.countries : this.state.countries
      .filter(country => country.name.toLowerCase().includes(this.state.filter))
    console.log("render() funktiossa. countriesToShow:", countriesToShow)
    return (
      <div>
        <div>Find countries: <input value={this.state.filter} onChange={this.handleFilterChange}/></div>
        {countriesToShow.length === 1 
        ? <CountryDetails country={countriesToShow[0]} />
        :
        (countriesToShow.length > 10 
        ? 'too many matches, specify another filter' 
        : countriesToShow.map(country => country.showDetails ? 
            <CountryDetails key={country.name} toggleShowDetails={this.toggleShowDetails(country.name)} country={country} /> 
            : <div onClick={this.toggleShowDetails(country.name)} key={country.name}>{country.name}</div>))}
      </div>
    )
  }
}

export default App;
