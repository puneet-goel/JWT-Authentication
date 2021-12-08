import axios from "axios";

const url = "http://localhost:5000";

const login = (email, password) => {

    const user = {
        email,
        password
    };

    axios.post(url+"/login", user);
}

const register = async(email, password, username) => {

    try{
        const user = {
            email: email,
            password: password,
            username: username
        };
        
        const {data} = await axios.post(url+"/signup", user);
        return data;
    }catch(err){
        console.log(err);
    }
}

const reset = () => {

}

export {login, register, reset};