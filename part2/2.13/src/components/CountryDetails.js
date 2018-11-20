import React from 'react'

const CountryDetails = ({country, toggleShowDetails}) => {
    return (
        <div onClick={toggleShowDetails}><h1>{country.name}</h1>
          <div>capital: {country.capital}</div>
          <div>population: {country.population}</div>
          <img src={country.flag} alt={country.flag} />
        </div>
    )
}

export default CountryDetails