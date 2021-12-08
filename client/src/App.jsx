import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Change from './components/Change/Change';
import Home from "./components/Home/Home";

const App = () => {
    
    const [isUserValid, setUserValid] = useState(false);


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ isUserValid?<Home />: <Navigate to="/login" /> } />
                <Route path="/login" element={ isUserValid?<Navigate to="/" />: <Login /> } />
                <Route path="/signup" element={ isUserValid?<Navigate to="/" />: <Register /> } />
                <Route path="/change" element={ isUserValid?<Navigate to="/" />: <Change /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
