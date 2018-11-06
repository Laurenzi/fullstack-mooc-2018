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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      palautteet: {
      hyvä: {nimi: 'hyvä', lkm: 0},
      neutraali: {nimi: 'neutraali', lkm: 0},
      huono: {nimi: 'huono', lkm : 0}
      }
    }
  }
  handleClick = (palaute, newValue) => { 
    return () => this.handleUpdate(palaute, newValue)
    }

  handleUpdate(palaute, newValue) {
    const oldState = this.state.palautteet;
    const newState = {...oldState};
    newState[palaute].lkm = newValue;
    this.setState(newState);
  }

  render() {
  const otsikko = "anna palautetta";
  const palautteiden_nimet = Object.keys(this.state.palautteet);
  const palautteet = this.state.palautteet;  
  return (
    <div>
      <Otsikko teksti={otsikko} />
      {palautteiden_nimet.map(palaute => 
        <Nappi key={palaute} teksti={palautteet[palaute].nimi} handleClick={this.handleClick(palaute, this.state.palautteet[palaute].lkm + 1)}></Nappi>)}
      <Otsikko teksti={"statistiikka"} />
      {palautteiden_nimet.map(palaute => <p key={palaute}>{palaute} {palautteet[palaute].lkm}</p>)}
    </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)