import { useState } from "react"

const App=()=>{

    const [search,setSearch]=useState('')
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const featchWeather=async()=>{
        setLoading(true)
        setError(null)
        setData(null)
        try{
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)

            if (!response.ok){
                if (response.status===401){
                    throw new Error('Unauthorized')
                }
                else if (response.status===404){
                    throw new Error('not found')
                }
                else throw new Error('Something went wrong in server')
            }
            const data=await  response.json()

        
            setData(data)

        }catch(error){
            setError(error)

        }finally{
          setLoading(false)
        }
    }

    return(
    <div>
    {loading && <div>loading...</div>}
    <input value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <button onClick={featchWeather}>search</button>

    {data && <div>
        <h1> City name{data.name}</h1> 

        <h2>Main: {data.weather[0].main}</h2>
        <h3>Description of the weather {data.weather[0].description}</h3>
        <h3>Main temperature {data.main.temp}</h3>
        <h3>Wind speed {data.wind.speed}</h3>
        </div>}

    {error &&  <div>{error.message}</div>}
    </div>
)}
export default App