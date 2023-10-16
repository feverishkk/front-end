import axios from 'axios';

const Account_REST_API_BASE_URL = 'http://localhost:8080/api/account';

export const registerUser = (register) => axios.post(Account_REST_API_BASE_URL + '/register', register);

export const loginUser = (email, password) => axios.post(Account_REST_API_BASE_URL + '/login', 
                                                            { headers: {"Content-Type": "multipart/form-data"}, email, password });

export const saveLoggedInUser = (user_id) => {
    sessionStorage.setItem("user_id",user_id);
}

export const isUserLoggedIn = () => {
    const userId = sessionStorage.getItem("user_id");

    if( userId == null ) return false;
    else return true;
}

export const getLoggedInUser = () => {
    const userId = sessionStorage.getItem("user_id");
    return userId;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}