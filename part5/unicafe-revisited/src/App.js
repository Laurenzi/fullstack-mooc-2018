import React from 'react'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palautteet = store.getState()
  console.log('Palautteet.good:', palautteet.good)
  console.log('Palautteet.ok:', palautteet.ok)
  console.log('Palautteet.bad:', palautteet.bad)
  const palautteita = palautteet.good + palautteet.ok + palautteet.bad
  const palautteiden_summa = (palautteet.good ? palautteet.good : 0) - (palautteet.bad ? palautteet.bad : 0)
  const palautteiden_ka = palautteita === 0 ? 0 : palautteiden_summa / palautteita
  const positiivisia = palautteita === 0 ? 0 : palautteet.good / palautteita
  
  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      Palautteita: {palautteita}
      Palautteiden summa: {palautteiden_summa}
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteet.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteet.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteet.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{palautteiden_ka}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    console.log(nappi)
    store.dispatch({type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

export { App, store }