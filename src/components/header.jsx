import { useNavigate } from 'react-router-dom'
import './header.css'
import { Link } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
export default function Header(){

    const navigate=useNavigate()

    return(
        <div className='w-full h-[80px] drop-shadow-2xl flex bg-secondary text-primary'>
            <img src="/logo2.png" alt="logo" className='h-auto w-[170px] cursor-pointer object-cover ' onClick={
                ()=>{
                    navigate('/')
                }
            } />
            <div className='h-full w-[calc(100%-285px)] flex items-center justify-center gap-10  text-xl  font-bold'>
                <Link to="/" className="block p-4  ">Home</Link>
                <Link to="/products" className="block p-4 ">Products</Link>
                <Link to="/contact" className="block p-4 ">Contact</Link>
                <Link to="/about" className="block p-4 ">About</Link>
                <Link 
  to="/askAI" 
  className="inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-full bg-white text-sm font-semibold text-black hover:bg-indigo-600 active:bg-indigo-700 shadow-sm hover:shadow-md hover:shadow-indigo-100 transition-all duration-200"
>
  {/* Sparkle Icon */}
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
  </svg>
  <span>Ask AI</span>
</Link>
            </div>
            <Link to="/cart" className='h-full w-[95px] flex justify-center items-center text-3xl'><IoCartOutline className='cursor-pointer' /></Link>
            <div className='h-full w-[95px]  flex items-center justify-center  font-bold'>Profile</div>
        </div>
    )
}
