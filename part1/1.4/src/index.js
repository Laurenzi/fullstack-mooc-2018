import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.teksti}</h1>
    )
}

const Sisalto = (props) => {
    return (
      <div>
        {props.osat.map(osa => <Osa nimi={osa.nimi} tehtavia={osa.tehtavia}/>)}
      </div>
    )
  }

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
  const yhteensa = props.osat.map(osa => osa.tehtavia).reduce((acc, curr) => acc + curr, 0)
    return (
        <p>Yhteensä {yhteensa} tehtävää</p>
    )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko teksti={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)