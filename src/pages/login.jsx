import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const googleLogin=useGoogleLogin({
        onSuccess: (response)=>{
            console.log(response)
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google",{
                accessToken:response.access_token
            }).then((res)=>{
                toast.success("login successful")
                localStorage.setItem("token",res.data.token)    
                if(res.data.role==="admin"){
                    navigate("/admin")
                }else{
                    navigate("/")
                }
            })
        }
    })

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
        <div className="relative min-h-screen flex items-center justify-center bg-[url('/login.png')] bg-cover bg-center overflow-hidden">

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Login Card */}
            <div
                className="
                relative
                w-[420px]
                rounded-3xl
                border border-white/20
                bg-white/10
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                px-10
                py-10
                "
            >
                {/* Heading */}
                <h1 className="text-4xl font-bold text-white text-center">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-300 mt-2 text-sm">
                    Sign in to continue
                </p>

                {/* Form */}
                <div className="mt-8 flex flex-col gap-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-white font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="
                                w-full
                                h-12
                                rounded-xl
                                px-4
                                bg-white/10
                                border border-white/20
                                text-white
                                placeholder:text-gray-400
                                outline-none
                                focus:border-white/50
                                transition
                            "
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-white font-medium mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="
                                w-full
                                h-12
                                rounded-xl
                                px-4
                                bg-white/10
                                border border-white/20
                                text-white
                                placeholder:text-gray-400
                                outline-none
                                focus:border-white/50
                                transition
                            "
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="
                            w-full
                            h-12
                            rounded-xl
                            bg-white
                            text-black
                            font-semibold
                            mt-2
                            transition-all
                            duration-300
                            hover:bg-gray-100
                            hover:scale-[1.02]
                            active:scale-95
                        "
                    >
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-gray-300 text-sm">OR</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={googleLogin}
                        className="
                            w-full
                            h-12
                            rounded-xl
                            bg-white
                            flex
                            items-center
                            justify-center
                            gap-3
                            text-gray-700
                            font-medium
                            transition-all
                            duration-300
                            hover:bg-gray-100
                            hover:scale-[1.02]
                            active:scale-95
                        "
                    >
                        <FcGoogle className="text-2xl" />
                        Continue with Google
                    </button>

                </div>
            </div>
        </div>
    )
}