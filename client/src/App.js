import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './Login'
import Login from './Login'
import Register from './Register'
import Home from './home'
import Landing from './landingpage'
import Home2 from './home2'

const App = () => {
    return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/home2" element={<Home2 />} />
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </BrowserRouter>
            </div>
    )
}

export default App