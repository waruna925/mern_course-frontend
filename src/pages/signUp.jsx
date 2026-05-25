import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSignUp() {

        try {

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/",
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            )

            console.log(response.data)

            toast.success("Account created successfully")

            navigate("/login")

        } catch (e) {

            toast.error(e.response?.data?.message || "Something went wrong")

        }

    }

    return (
        <div className="relative w-full h-screen bg-[url('/login.png')] bg-cover bg-center flex items-center justify-center">

            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* signup card */}
            <div className="relative w-[550px] h-[780px] rounded-2xl 
            backdrop-blur-xl bg-white/10 border border-white/20">

                <h1 className="pt-8 text-5xl text-center text-white font-extrabold">
                    Create Account
                </h1>

                <p className="text-white text-center mt-2">
                    Sign up to continue
                </p>

                <div className="p-14 flex flex-col items-center justify-center gap-6">

                    {/* First Name */}
                    <label
                        className="text-white font-bold text-2xl ml-[-170px] mb-[-10px]"
                    >
                        First Name
                    </label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        className="w-[320px] h-[50px] rounded-xl px-4 
                        bg-white/20 text-white border border-white/20 
                        outline-none placeholder-white/70"
                    />

                    {/* Last Name */}
                    <label
                        className="text-white font-bold text-2xl ml-[-170px] mb-[-10px]"
                    >
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        className="w-[320px] h-[50px] rounded-xl px-4 
                        bg-white/20 text-white border border-white/20 
                        outline-none placeholder-white/70"
                    />

                    {/* Email */}
                    <label
                        className="text-white font-bold text-2xl ml-[-210px] mb-[-10px]"
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="w-[320px] h-[50px] rounded-xl px-4 
                        bg-white/20 text-white border border-white/20 
                        outline-none placeholder-white/70"
                    />

                    {/* Password */}
                    <label
                        className="text-white font-bold text-2xl ml-[-180px] mb-[-10px]"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-[320px] h-[50px] rounded-xl px-4 
                        bg-white/20 text-white border border-white/20 
                        outline-none placeholder-white/70"
                    />

                    {/* Button */}
                    <button
                        onClick={handleSignUp}
                        className="
                        bg-white text-black text-xl rounded-2xl
                        w-[320px] h-[45px] mt-6 font-semibold
                        transition-all duration-300 ease-in-out

                        hover:bg-gray-200
                        hover:scale-105
                        hover:shadow-2xl

                        active:scale-95
                        "
                    >
                        Sign Up
                    </button>

                </div>
            </div>
        </div>
    )
}