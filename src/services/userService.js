import http from "./httpService";
import config from "../config.json";

const api = config.userApiEndpoint;

export function register(user) {
    console.log(user);
    return http.post(api, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}