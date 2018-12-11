import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu sovellukseen</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Käyttäjätunnus
          <input
            type="text" 
            value={username}
            onChange={handleChange} 
            name="username"
          />
        </div>
        <div>
          Salasana
          <input 
            type="password" 
            value={password}
            onChange={handleChange} 
            name="password" 
          />
        </div>
        <button type="submit">Kirjaudu</button>
    </form>
  </div>
  )
}

export default LoginForm