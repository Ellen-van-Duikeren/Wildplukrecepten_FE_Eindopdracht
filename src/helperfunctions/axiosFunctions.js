import axios from "axios";

export const API_URL = 'http://localhost:8081';


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

// const fetchData = async () => {
//     setLoading( true );
//     try {
//         setError( false );
//         const response = await authAxios.get( `/assignments`, {
//             signal: controller.signal,
//         } );
//         setData( response.data );
//         console.log(data)
//     } catch ( e ) {




// const token = localStorage.getItem('token');




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
