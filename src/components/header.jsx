import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'


export default function Header() {
    const navigate = useNavigate()
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        setSideDrawerOpen(false);
    };

    return (
        <div className='w-full h-[80px] drop-shadow-2xl flex bg-secondary text-primary justify-center items-center sticky top-0 z-50 px-4 md:px-8'>
            {/* The outer container remains a flex row on mobile, and a 3-column grid on desktop */}
            <div className='w-full max-w-7xl flex md:grid md:grid-cols-3 items-center justify-between h-full relative'>

                {/* Left Side: Mobile Hamburger & Desktop Logo placement */}
                <div className='flex items-center gap-4 h-full z-10'>
                    {/* Mobile Hamburger */}
                    <GiHamburgerMenu
                        className='md:hidden text-3xl cursor-pointer hover:opacity-80 transition-opacity'
                        onClick={() => setSideDrawerOpen(true)}
                    />

                    {/* Desktop Logo Placement (Hidden on mobile grid tracking) */}
                    <img
                        src="/logo2.png"
                        alt="logo"
                        className='hidden md:block h-18  w-auto cursor-pointer object-contain'
                        onClick={() => navigate('/')}
                    />
                </div>

                {/* Center Navigation Links (Desktop only) */}
                <div className='hidden md:flex items-center justify-self-center gap-8 text-xl font-bold h-full'>
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
                    <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                </div>

                {/* Center Mobile Logo: Explicitly centered via absolute coordinates on mobile view only */}
                <div className='absolute md:hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto'>
                    <img
                        src="/logo2.png"
                        alt="logo"
                        className='h-18 w-auto cursor-pointer object-contain'
                        onClick={() => navigate('/')}
                    />
                </div>

                {/* Right Side Container: Actions Menu & Ask AI */}
                <div className='flex items-center justify-self-end gap-4 md:gap-6 h-full z-10'>
                    {/* Ask AI Accent Button (Desktop only) */}
                    <Link
                        to="/askAI"
                        className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-white text-sm font-semibold text-black hover:bg-indigo-600 hover:text-white active:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
                        </svg>
                        <span>Ask AI</span>
                    </Link>

                    {/* Cart Icon */}
                    <Link to="/cart" className='text-3xl flex items-center justify-center hover:text-accent transition-colors'>
                        <IoCartOutline className='cursor-pointer' />
                    </Link>

                    {/* Profile Link (Desktop only) */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/profile"
                            className="font-bold hover:text-accent transition-colors"
                        >
                            Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>

            {/* Side Mobile Drawer */}
            {sideDrawerOpen && (
                <div
                    className="fixed inset-0 z-[100] md:hidden"
                    onClick={() => setSideDrawerOpen(false)}
                >
                    {/* Backdrop Overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                    {/* Drawer Content Body */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-0 top-0 h-screen w-[82%] max-w-[320px] bg-white flex flex-col shadow-2xl text-slate-800"
                    >
                        {/* Drawer Brand Header */}
                        <div className="h-20 min-h-[80px] flex items-center justify-between px-5 border-b border-slate-100 bg-secondary shrink-0">
                            <img
                                src="/logo2.png"
                                alt="logo"
                                className="h-18 cursor-pointer object-contain"
                                onClick={() => {
                                    navigate("/");
                                    setSideDrawerOpen(false);
                                }}
                            />
                            <button
                                onClick={() => setSideDrawerOpen(false)}
                                className="text-white text-2xl p-1 rounded-md hover:bg-white/10 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Navigation Body Container */}
                        <div className="flex-1 flex flex-col justify-start py-4 overflow-y-auto bg-white">
                            <Link
                                to="/"
                                onClick={() => setSideDrawerOpen(false)}
                                className="flex items-center h-14 min-h-[56px] px-6 text-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 border-l-4 border-transparent hover:border-indigo-600 transition-all block w-full"
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setSideDrawerOpen(false)}
                                className="flex items-center h-14 min-h-[56px] px-6 text-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 border-l-4 border-transparent hover:border-indigo-600 transition-all block w-full"
                            >
                                Products
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => setSideDrawerOpen(false)}
                                className="flex items-center h-14 min-h-[56px] px-6 text-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 border-l-4 border-transparent hover:border-indigo-600 transition-all block w-full"
                            >
                                Contact
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setSideDrawerOpen(false)}
                                className="flex items-center h-14 min-h-[56px] px-6 text-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 border-l-4 border-transparent hover:border-indigo-600 transition-all block w-full"
                            >
                                About
                            </Link>

                            <div className="px-5 mt-6 w-full shrink-0">
                                <Link
                                    to="/askAI"
                                    onClick={() => setSideDrawerOpen(false)}
                                    className="flex items-center justify-center gap-2 h-12 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-md w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
                                    </svg>
                                    <span>Ask AI</span>
                                </Link>
                            </div>
                        </div>

                        {/* Sticky Drawer Base Actions Fixed to Bottom */}
                        <div className="mt-auto border-t border-slate-100 bg-slate-50 text-slate-700 shrink-0">
                            <Link
                                to="/cart"
                                onClick={() => setSideDrawerOpen(false)}
                                className="flex items-center justify-between px-6 h-14 hover:bg-slate-100 transition-colors block w-full"
                            >
                                <span className="font-semibold">Cart</span>
                                <IoCartOutline className="text-2xl text-slate-600" />
                            </Link>

                            <Link
                                to="/profile"
                                onClick={() => setSideDrawerOpen(false)}
                                className="w-full flex items-center justify-between px-6 h-14 hover:bg-slate-100 transition-colors border-t border-slate-200/60 block"
                            >
                                <span className="font-semibold">Profile</span>
                                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
                                    P
                                </div>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center px-6 h-14 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors border-t border-slate-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}