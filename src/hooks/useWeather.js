import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../api/weatherApi"

export const useWeather=(city)=>{
    return useQuery({
        queryKey:['weather',city],
        queryFn:async ()=>{
       const response= await axiosInstance.get('weather',{
           params:  {
                q:city
            }
         } )
          return response.data
        } ,
        enabled:!!city
    })

}