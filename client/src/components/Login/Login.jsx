import React from 'react';

import { login } from "../../api";

const Login = () => {
    
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        login(email,password);
    } 

    return(
        <div>
            <form onSubmit={handleLogin}>
                <label for="email">First name:</label><br />
                    <input type="email" name="email" value="abc@example.com" /><br />
                <label for="password">Last name:</label><br />
                    <input type="password" name="password" value="******" /><br /><br />
                <input type="submit" value="Submit" />
            </form> 
        </div>
    )
}

export default Login;
