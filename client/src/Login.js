import { useState } from 'react'
// import './App.css';
// import './login.css';
import { useNavigate } from 'react-router-dom'

function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('https://react-app-clone-summative.herokuapp.com/api/v1/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			// window.location.href = '/home2'
			navigate('/home2')
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
			
			<form onSubmit={loginUser}>
				<h1>Login</h1>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login"  />
			</form>
		</div>
	)
}

export default Login