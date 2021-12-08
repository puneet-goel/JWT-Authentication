import axios from "axios";

const url = "http://localhost:5000";

const login = async(email, password, username) => {

    try{
        const user = {
            email: email,
            password: password,
            username: username
        };
        
        const {data} = await axios.post(url+"/login", user);

        var message = data;
        if(data && data.message==="ok"){
            localStorage.setItem('token', data.token);
            message = "ok";
        }
        
        return message;
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
        
        const {data} = await axios.post(url+"/signup", user);
        return data;
    }catch(err){
        console.log(err);
    }
}

const reset = () => {

}

export {login, register, reset};