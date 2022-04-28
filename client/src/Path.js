import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './Login'
import Login from './Login'
import Register from './App'

const App = () => {
    return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" exact component ={Login} />
                        <Route path="/register" exact component ={Register} />
                    </Routes>
                </BrowserRouter>
            </div>
    )
}

export default App