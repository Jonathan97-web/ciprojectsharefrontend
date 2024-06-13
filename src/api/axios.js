import axios from "axios";

axios.defaults.baseURL = "http://localhost:1337/api/";
axios.defaults.withCredentials = true;

const instance = axios.create();

export default instance;
