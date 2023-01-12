import axios from "axios";

const token = localStorage.getItem('token');
export const API_URL = 'http://localhost:8081';

// export const authAxios = axios.create({
//     bareUrl: API_URL,
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// });

//Nova
// voor post
// const response = await axios.post('http://localhost:8081/jouw-endpoint', {
//     blogTitle: 'Superleuk restaurant',
//     content: 'lorem ipsum dolor',
// }, {
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//     }
// });



//Bas
// const bearerToken = '{token}';
// const url = "http://localhost:8081/"
//
// const authAxios = axios.create({
//     bareUrl: url,
//     headers: {
//         Authorization: `Bearer ${bearerToken}`,
//     },
// });


//Jelmer
// async function loginUser(data){
//     return axios.post(`${API_URL}/authenticate`, data)
// }
//
// axios.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     config.headers['Content-Type'] = 'application/json'
//     config.headers['Access-Control-Allow-Origin'] = '*'
//     console.log(config)
//     return config
// })

async function fetchUser(username) {
    return axios.get(`${API_URL}/users/${username}`)
}




//
//
export {
    fetchUser
}
