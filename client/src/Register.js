import logo from './logo.svg';
import { useState } from 'react'
import './App.css';
import { useNavigate } from 'react-router-dom'
// const User = require("../models/users");

function App() {
  
    const navigate = useNavigate()
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  
  async function registerUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/api/v1/add_user', {
    method:'POST',
headers: {
  'Content-Type': 'application/json',
},
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    
  })

  const data = await response.json()

  if (data.status === 'ok') {
      window.location.href = '/login'
			// navigate.push('/login')
     
		}

  console.log(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Reddit.
        </p>
        
      </header>
      <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" 
            placeholder="Username"       
          /> 
          <br>
          </br>

          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text" 
            placeholder="Email"       
          />
            <br>
          </br>

          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder="Password"       
          />
          <br/>
          <a href='Login.js'><input type="Submit" value="Register"/></a>
          <br/>
         
        </form>
      </div>
    </div>
    
  );
}

export default App;
