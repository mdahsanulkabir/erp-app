import axios from 'axios';

const BASE_URL: string ='http://localhost:5000';


export default axios.create({
    baseURL: BASE_URL
});