import axios from "axios";


const $host = axios.create({
    baseURL: 'http://localhost:3049/'

})

// const $authHost = axios.create({
//     baseURL: process.env.PORT

// })

// const authInterceptor = config => {
//     config.headers.authorization= `Bearer ${localStorage.getItem('token')}`
//     return config
// }   

// $authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    // $authHost
}