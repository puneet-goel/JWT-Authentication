import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({setUserValid}) => {

    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        setUserValid(false);
        sessionStorage.clear();
        navigate('/');
    }

    return(
        <div>
            Hello World

            <button type="submit" onSubmit={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Home;
