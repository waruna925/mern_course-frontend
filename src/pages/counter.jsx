import { useState } from "react"

export default function Counter(){
    const [count ,setCount]=useState(0)
    const [result ,setResult]=useState("don't know")
    return(
        <>
            <div className="flex items-center justify-center h-screen bg- flex-col gap-10">
                <div className="bg-gray-100 h-[300px] w-[600px] rounded-2xl shadow-2xl flex flex-row items-center justify-center gap-14">
                    <button onClick={()=>{
                        setCount(count-1)
                    }                    } className="text-[20px] text-white bg-blue-500  py-2 rounded-full w-[100px] h-[40px] text-center ">-</button>
                    <span className="text-[30px]">{count}</span>
                    <button onClick={()=>{
                        setCount(count+1)
                    }} className="text-[20px] text-white bg-blue-500  py-2 rounded-full w-[100px] h-[40px] text-center ">+</button>
                </div>
                <div className="bg-gray-100 h-[300px] w-[600px] rounded-2xl shadow-2xl flex flex-row items-center justify-center gap-14">
                    <button onClick={()=>{
                        setResult("Pass")
                    }                    } className="text-[20px] text-white bg-blue-500  py-2 rounded-full w-[100px] h-[40px] text-center ">Pass</button>
                    <span className="text-[30px]">{result}</span>
                    <button onClick={()=>{
                        setResult("Fail")
                    }} className="text-[20px] text-white bg-blue-500  py-2 rounded-full w-[100px] h-[40px] text-center ">Fail</button>
                </div>
            </div>
        </>
    )
}