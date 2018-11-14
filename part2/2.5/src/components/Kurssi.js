import React from 'react'
import Otsikko from './Otsikko'
import Osa from './Osa'

const Kurssi = ({kurssi}) => {
  return (
    <div>
    <Otsikko teksti={kurssi.nimi} />
    {console.log("osat:", kurssi.osat)}
    {console.log("nimi:", kurssi.nimi)}
    {kurssi.osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
    Yhteensä {kurssi.osat.reduce((acc, curr) => acc + curr.tehtavia, 0)} tehtävää.
    </div>
  )
}

export default Kurssi