import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({setUserValid}) => {

    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        setUserValid(false);

        //delete the token cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
    }

    return(
        <div>
            Hello World

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Home;
