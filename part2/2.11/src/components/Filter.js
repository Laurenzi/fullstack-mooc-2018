import React from 'react';

const Filter = ( {value, onChange } ) => {
    return (
        <div>
            rajaa näytettäviä: <input value={value} onChange={onChange}/>
        </div>
    )
}

export default Filter