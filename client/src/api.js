import axios from "axios";

const url = "https://jwt-authorisation.herokuapp.com";
// const url = "http://localhost:5000";

export const login = async(email, password, username, check) => {

    try{
        const user = {
            email: email,
            password: password,
            username: username
        };
        
        const {data} = await axios.post(url + '/login', user);

        if(data.message==="ok"){

            //create a token cookie
            const d = new Date();
            var days = 1;
            if(check){
                days = 30;
            }

            d.setTime(d.getTime() + (days*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = `token=${data.token}; ${expires}; path=/;`;
        }
        
        return data.message;

    }catch(err){
        console.log(err);
    }
}

export const register = async(email, password, username) => {

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

export const forgotPassword = async(email) => {

    try{
        const {data} = await axios.post(url + '/forgot', {email: email});
        return data.message;

    }catch(err){
        console.log(err);
    }
}

export const resetPassword = async(id, username, password) => {
    try{

        const user = {
            id: id,
            password: password,
            username: username
        };

        const {data} = await axios.post(url + '/reset-password', user);
        return data.message;

    }catch(err){
        console.log(err);
    }
}

export const authorize = async() => {
    try{
        var token = decodeURIComponent(document.cookie);
        if(!token || token.length <6 ){
            return false;
        }

        token = token.substring(6);
        const {data} = await axios.post(url + '/authorize', {token: token});
        if(data.message === "yes"){
            return true;
        }else{
            return false;
        }

    }catch(err){
        console.log(err);
    }
}