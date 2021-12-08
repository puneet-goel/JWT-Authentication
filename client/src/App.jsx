import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Home from "./components/Home/Home";
import { authorize } from "./api";

const App = () => {
    
    const [isUserValid, setUserValid] = useState(false);

    useEffect(() => {
        (async () => {
            const x = await authorize();
            setUserValid(x);
        })()
    },[]);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ isUserValid?<Home setUserValid={setUserValid} />: <Navigate to="/login" /> } />
                <Route path="/login" element={ isUserValid?<Navigate to="/" />: <Login setUserValid={setUserValid} /> } />
                <Route path="/signup" element={ isUserValid?<Navigate to="/" />: <Signup /> } />
                <Route path="/forgot-password" element={ isUserValid?<Navigate to="/" />: <ForgotPassword /> } />
                <Route path="/reset-password/:id" element={ isUserValid?<Navigate to="/" />: <ResetPassword /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
