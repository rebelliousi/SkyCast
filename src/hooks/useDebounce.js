import { useEffect, useState } from "react"



export const useDebounce=(value,delay)=>{

 const [debouncedCity,setDebouncedCity]=useState('')

  useEffect(()=>{
    const timeout=setTimeout(() => {
        setDebouncedCity(value)
    }, delay);

    return ()=>clearTimeout(timeout)
  },[value,delay]) 

  return debouncedCity
}