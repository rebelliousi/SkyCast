import {useState } from "react"
import { useWeather } from "./hooks/useWeather"
import { useDebounce } from "./hooks/useDebounce"

const App=()=>{

    const [search,setSearch]=useState('')
    const debouncedCity=useDebounce(search,500)
     const{ data,isLoading,isError,error}=useWeather(debouncedCity)
    return(
    <div>
    {isLoading && <div>loading...</div>}
    <input value={search} onChange={(e)=>setSearch(e.target.value)}/>
  


    {data && <div>
        <h1> City name{data.name}</h1> 

        <h2>Main: {data.weather[0].main}</h2>
        <h3>Description of the weather {data.weather[0].description}</h3>
        <h3>Main temperature {data.main.temp}</h3>
        <h3>Wind speed {data.wind.speed}</h3>
        </div>}

    {isError &&  <div>{error.message}</div>}
    </div>
)}
export default App