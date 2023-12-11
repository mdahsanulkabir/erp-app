import axios from 'axios';

const BASE_URL: string ='http://localhost:5000';


export default axios.create({
    baseURL: BASE_URL
});


// attach interceptor for JWT
// if the initial token expired, we need to try again. For
// this reason an interceptor is required
// Global config can be done for common base URL, headers, or authentication tokens for all requests.
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type' : 'application/json'
    },
    withCredentials: true
})