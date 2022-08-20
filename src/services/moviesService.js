import http from './httpService';
import config from "../config.json";

function MovieUrl(id) {
    return `${config.movieApiEndpoint}/${id}`
}

export function getMovies() {
    return http.get(config.movieApiEndpoint);
}

export function deleteMovie(movieId) {
    return http.delete(MovieUrl(movieId));
}

export function getMovie(id) {
    return http.get(MovieUrl(id));
}

export function saveMovie(obj) {
    if (obj._id) {
        const body = { ...obj };//server will not accept the put request as the obj contain _id property, b 
        delete body._id;
        return http.put(MovieUrl(obj._id), body);

    }
    return http.post(config.movieApiEndpoint, obj);

}