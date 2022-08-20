import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

// axios.defaults.headers.common['x-auth-token'] = auth.getJwt(); //can config the header in all http request, if .post, only configure the header in a post request
//causing bidirectional dependency


axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status <= 500;//the argument after the equal actually is the condition used as the condition in the below if statment
    if (!expectedError) {
        console.log('Logging the error', error);
        toast.error('An unexpected error occured');//display message in toast format
    }
    logger.log(error);
    return Promise.reject(error);
})//the first parameter is the function will call when it is successful, the second one will call on the other hand

function setJwt(jwt) {//because http is a more important module than auth, we stop import thing from auth
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};