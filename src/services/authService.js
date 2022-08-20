import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const api = config.authApiEndpoint;
const tokenKey = 'token';

http.setJwt(getJwt());//we call the setJwt in order to include jwt in the header for every http request 

export async function login(email, password) {

    const { data: jwt } = await http.post(api, { email, password });
    console.log("jwt: ", jwt);
    localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);

    } catch (error) { }

}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login, loginWithJwt, logout, getCurrentUser, getJwt
}