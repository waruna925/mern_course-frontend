import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()

    async function handleLogin() {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
                email: email,
                password: password
            })
            console.log(response.data)
            toast.success("login successful")
            localStorage.setItem("token", response.data.token)
            if (response.data.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }
        } catch (e) {
            toast.error(e.response.data.message)
        }

    }

    return (
        <div className="relative w-full h-screen bg-[url('/login.png')] bg-cover bg-center flex items-center justify-center">

            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* login card */}
            <div className="relative w-[550px] h-[650px] rounded-2xl 
            backdrop-blur-xl bg-white/10 border border-white/20">

                <h1 className="pt-8 text-5xl text-center text-white font-extrabold">
                    Welcome
                </h1>

                <p className="text-white text-center mt-2">
                    Login to your account
                </p>

                <div className="p-20 flex flex-col items-center justify-center gap-8">

                    <label
                        htmlFor="username"
                        className="text-white font-bold text-2xl ml-[-200px] mb-[-20px]"
                    >
                        Username
                    </label>

                    <input
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="text" value={email}
                        className="w-[320px] h-[50px] rounded-xl px-4 bg-white/20 text-white border border-white/20outline-none placeholder-white/70" placeholder="Enter username"
                    />

                    <label
                        htmlFor="password" className="text-white font-bold text-2xl ml-[-200px] mb-[-20px]"
                    >
                        Password
                    </label>

                    <input
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="password" value={password} className="w-[320px] h-[50px] rounded-xl px-4 bg-white/20 text-white border border-white/20 outline-none placeholder-white/70" placeholder="Enter password"
                    />

                    <button
                        onClick={handleLogin}
                        className="
                        bg-white text-black text-xl rounded-2xl
                        w-[320px] h-[45px] mt-9 font-semibold
                        transition-all duration-300 ease-in-out

                        hover:bg-gray-200
                        hover:scale-105
                        hover:shadow-2xl

                        active:scale-95
                        "
                    >
                        Login
                    </button>

                </div>
            </div>
        </div>
    )
}