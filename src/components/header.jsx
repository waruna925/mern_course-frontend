import { useNavigate } from 'react-router-dom'
import './header.css'
import { Link } from 'react-router-dom'
export default function Header(){

    const navigate=useNavigate()

    return(
        <div className='w-full h-[80px] shadow-2xl flex '>
            <img src="/logo.png" alt="logo" className='h-auto w-[95px] cursor-pointer' onClick={
                ()=>{
                    navigate('/')
                }
            } />
            <div className='h-full w-[calc(100%-190px)] flex items-center justify-center gap-10 text-xl text-white font-bold'>
                <Link to="/" className="block p-4 text-black ">Home</Link>
                <Link to="/products" className="block p-4 text-black">Products</Link>
                <Link to="/contact" className="block p-4 text-black">Contact</Link>
                <Link to="/about" className="block p-4 text-black">About</Link>
            </div>
            <div className='h-full w-[95px]  flex items-center justify-center  font-bold'>Profile</div>
        </div>
    )
}
