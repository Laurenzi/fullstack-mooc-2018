import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.teksti}</h1>
    )
}

const Sisalto = (props) => {
  console.log("Propsit:" ,props);
    return (
      <div>
        <Osa {...props.osa1} />
        <Osa {...props.osa2} />
        <Osa {...props.osa3} />
      </div>
    )
  }

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    return (
        <p>Yhteensä {props.tehtavia_yhteensa} tehtävää</p>
    )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko teksti={kurssi} />
      <Sisalto {...{osa1, osa2, osa3}} />
      <Yhteensa tehtavia_yhteensa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)