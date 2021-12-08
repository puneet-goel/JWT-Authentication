import axios from "axios";

const url = "http://localhost:5000";

const login = async(email, password, username) => {

    try{
        const user = {
            email: email,
            password: password,
            username: username
        };
        
        const {data} = await axios.post(url + '/login', user);

        if(data.message==="ok"){
            localStorage.setItem('token', data.token);
        }
        
        return data.message;

    }catch(err){
        console.log(err);
    }
}

const register = async(email, password, username) => {

    try{
        const user = {
            email: email,
            password: password,
            username: username
        };
        
        const {data} = await axios.post(url + '/signup', user);
        return data.message;

    }catch(err){
        console.log(err);
    }
}

const forgotPassword = async(email) => {

    try{
        const {data} = await axios.post(url + '/forgot', {email: email});
        return data.message;

    }catch(err){
        console.log(err);
    }
}

export {login, register, forgotPassword};