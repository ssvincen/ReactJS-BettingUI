import Axios from "axios";

const apiUrl = 'https://localhost:44349/';
const BettingAPI = Axios.create({
    baseURL: apiUrl
});

const api = Axios.create({
    baseURL: `https://reqres.in/api`
});

const isLogin = () =>{
    const user = sessionStorage.getItem('BettingUser');  
    return (user != null) ? true : false;
}

const GetLoginUser = () =>{
    const user = sessionStorage.getItem('BettingUser');  
    return user ? JSON.parse(user) : null;   
}

const AutHeader = () => {
    let token = JSON.parse(sessionStorage.getItem('BettingToken'));
    if (token) {
        return {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token.access_token 
        };
    } else {
        return {};
    }
}

const LogOut = () => {    
    sessionStorage.removeItem('BettingToken');
    sessionStorage.removeItem('BettingUser');
}

export const Service = {
    BettingAPI,
    api,
    isLogin,
    GetLoginUser,
    LogOut,
    AutHeader
};