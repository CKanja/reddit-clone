import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './Login'
import Login from './Login'
import Register from './Register'

const App = () => {
    return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </div>
    )
}

export default App