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

    const response = await fetch('https://react-app-clone-summative.herokuapp.com/api/v1/add_user', {
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
      navigate('/login')
      // window.location.href = '/login'
			// navigate.push('/login')
     
		}

  console.log(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>
          Welcome to Reddit.
        </h2>
        
      </header>
      <div>
        
        <form onSubmit={registerUser}>
          <h1>Register</h1>
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
