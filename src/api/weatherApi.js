import axios from "axios";



const BASEURL='https://api.openweathermap.org/data/2.5/'
export const  axiosInstance=axios.create({
    baseURL:BASEURL,
    timeout:10000,
    params:{
        appid:import.meta.env.VITE_WEATHER_API_KEY,
        units:'metric'
    }
   

})