import React from 'react';
import { useNavigate } from "react-router-dom";

import image from "./img_avatar.png";

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
            <nav className="navbar navbar-light bg-light p-2">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://github.com/puneet-goel/JWT-Authentication"><i className="bi bi-github"/></a>
                    <form className="d-flex">
                        <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
                    </form>
                </div>
            </nav>

            <div className="container-fluid pt-3">
                <div className="row justify-content-center">
                    <div className="card col-8 col-sm-6 bg-white px-3 pt-3" style={{width: "18rem"}}>
                        <img src={image} className="card-img-top" alt="profile iamge"/>
                        <div className="card-body p-3">
                            <h5 className="card-title">Puneet Goel</h5>
                            <p className="card-text">I’m a MERN Stack Developer and a Competitive Programmer. </p>
                            <a className="navbar-brand" href="https://www.linkedin.com/in/gl-puneet"><i className="bi bi-linkedin"/></a>
                            <a className="navbar-brand text-dark" href="https://github.com/puneet-goel"><i className="bi bi-github"/></a>
                            <a className="navbar-brand text-danger" href="mailto:puneetgoel016@gmail.com"><i className="bi bi-envelope-fill"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
