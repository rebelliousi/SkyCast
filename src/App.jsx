import {useState } from "react"
import { useWeather } from "./hooks/useWeather"
import { useDebounce } from "./hooks/useDebounce"

const App=()=>{

    const [search,setSearch]=useState('')
    const debouncedCity=useDebounce(search,500)
     const{ data,isLoading,isError,error}=useWeather(debouncedCity)


    return(
<div className="relative min-h-screen w-full bg-slate-950 text-slate-50 overflow-hidden font-sans selection:bg-blue-500/30">

  <div className={`absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${data?.main.temp>25 ? 'bg-orange-500' :"bg-blue-600"}`}></div>

    <div className={`absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${data?.main.temp>25 ? 'bg-yellow-400' : 'bg-cyan-400'}`}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">

            <div className="w-full max-w-lg mb-16">
                <div className="relative group">
                    <input className="w-full bg-slate-900/50  backdrop-blur-2xl border border-white/5 rounded-2xl px-8 py-5 text-lg outline-none shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-300
                    focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-500"
                    placeholder="Search City..." 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}/>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">🔍 </div>

                </div>

            </div>


            {!data && !isLoading && !isError && (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-300 to-cyan-300 rounded-3xl rotate-12  mb-8 shadow-2xl shadow-blue-500/20"></div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-200">SkyCast</h1>
                    <p className="text-slate-500 mt-2">Enter a location to explore the atmosphere</p>

                </div>
            )}

            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full animate-pulse">
                    <div className="md:col-span-2  bg-white/5 rounded-3xl"></div>
                    <div className=" bg-white/5 rounded-3xl"></div>
                    <div className="bg-white/5 rounded-3xl"></div>

                </div>
            )}

            {data && !isLoading && (
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full animate-in fade-in zoom-in-95 duration-700">
                    <div className="md:col-span-2 md:row-span-2 bg-white/[0.03] backdrop-blur-3xl border  border-white/10 rounded-[40px] p-10 flex flex-col justify-between shadow-2xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Location</p>
                            <h2 className="text-4xl font-bold tracking-tight">{data.name}</h2>
                            <p className="text-slate-400 font-medium">{data.sys.country}</p>
                        </div>

                        <span className="text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            {data.weather[0].main==='Clear' ? '☀️' : '☁️'}
                        </span>

                    </div>

                    <div className="mt-12">
                        <h1 className="text-[120px] font-black tracking-tighter leading-none inline-block bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"> 
                            {Math.round(data.main.temp)}°

                        </h1>
                        <p className="text-slate-400 text-lg font-medium mt-2 capitalize">{data.weather[0].description}</p>

                    </div>

                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex flex-col justify-between hover:bg-white/[0.06] transition-colors">
                    <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3rem]">Wind</p>
                    <div>
                        <h3 className="text-3xl font-bold">{data.wind.speed}</h3>
                        <p className="text-slate-500 text-sm">km/h</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                     💨
                    </div>

                    </div>



                    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex flex-col justify-between hover:bg-white/[0.06] transition-colors">
                    <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3rem]">Humidity</p>
                    <div>
                        <h3 className="text-3xl font-bold">{data.main.humidity}%</h3>
                        <p className="text-slate-500 text-sm">Moisture</p>
                        <div className="w-10 h-10  rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">💧

                        </div>
                    </div>
                      </div>

                    <div className="md:col-span-2 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-1">Feels Like</p>
                        <h3 className="text-3xl font-bold">{Math.round(data.main.feels_like)}°C</h3>
                      </div>
                      <p className="text-slate-400 text-sm max-w-[150px] text-right">Percieved temperature based on conditions.</p>
                    </div>

                  

                 </div>
            )}
            {isError && (
              <div className="mt-10 px-8 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-medium backdrop-blur-xl">
                          ⚠️ City not found. Please verify the name.

              </div>
            )}

        </div>

    </div>
   


   



  
)}
export default App