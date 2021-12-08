import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Reset from './components/Reset/Reset';

const App = () => {
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Navigate to="/signup" /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/signup" element={ <Register /> } />
                <Route path="/reset" element={ <Reset /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
