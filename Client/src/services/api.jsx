import axios from 'axios';

const api = axios.create({
    baseURL:"https://notetakingapp-20ts.onrender.com/api" , 
    headers:{
        "Content-Type":"application/json"
    }
});
api.interceptors.request.use((config)=>{
    console.log("Hello world")
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
})

export default api;