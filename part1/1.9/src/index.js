import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.teksti}</h1>
    )
}

const Nappi = ({teksti, handleClick}) => {
  return (
    <button onClick={handleClick}>{teksti}</button>
  )
}

const Statistics = ({statistics}) => {
  return (<div>
    {statistics.map(statistic => <Statistic key={statistic.text} text={statistic.text} value={statistic.value} />)}
  </div>)
}

const Statistic = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keskiarvo: 0,
      positiivisia: "0 %",
      palautteita: 0,
      summa: 0,
      palautteet: {
      hyvä: {nimi: 'hyvä', lkm: 0, arvo: 1},
      neutraali: {nimi: 'neutraali', lkm: 0, arvo: 0},
      huono: {nimi: 'huono', lkm : 0, arvo: -1}
      }
    }
  }
  handleClick = (palaute, newValue) => { 
    return () => this.handleUpdate(palaute, newValue)
    }

  handleUpdate(palaute, newValue) {
    const oldState = this.state;
    const newState = {...oldState};
    newState.palautteet[palaute].lkm = newValue;
    newState.palautteita = newState.palautteita + 1;
    newState.summa = newState.summa + (palaute == 'hyvä' ? 1 : palaute == 'huono' ? -1 : 0)
    const average = newState.summa != 0 ? newState.summa / newState.palautteita : 0;
    if (palaute === 'hyvä') {
      newState.positiivisia = `${(newState.palautteet['hyvä'].lkm / newState.palautteita).toFixed(2)} %`;
    } 
    newState.keskiarvo = average;
    this.setState(newState);
  }

  render() {
  const otsikko = "anna palautetta";
  const palautteiden_nimet = Object.keys(this.state.palautteet);
  const palautteet = this.state.palautteet;  
  const palautteita_annettu = this.state.palautteita;
  const tilastot = [
    {text: 'keskiarvo', value: this.state.keskiarvo}, 
    {text: 'positiivisia', value: this.state.positiivisia}
  ];

  return (
    <div>
      <Otsikko teksti={otsikko} />
      {palautteiden_nimet.map(palaute => 
        <Nappi key={palaute} teksti={palautteet[palaute].nimi} handleClick={this.handleClick(palaute, this.state.palautteet[palaute].lkm + 1)}></Nappi>)}
      <Otsikko teksti={"statistiikka"} />
      {palautteita_annettu == 0 ? "Ei yhtään palautetta annettu" : <Statistics statistics={tilastot.concat(palautteiden_nimet.map(palaute => ({text: palaute, value: palautteet[palaute].lkm})))} />}
    </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)