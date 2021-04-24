import axios from "axios";
import {Notification} from "element-ui"

const instance = axios.create({
    baseURL: 'http://localhost:9999/',
    timeout: 10000,
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    let {code, message, data} = response.data;
    if (code == 20000) {
        return data;
    } else {
        Notification.error(message)
        return Promise.reject(false);
    }
}, function (error) {

    return Promise.reject(error);
});


export default instance;