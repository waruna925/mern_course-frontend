import { useNavigate } from 'react-router-dom'
import './header.css'
import { Link } from 'react-router-dom'
export default function Header(){

    const navigate=useNavigate()

    return(
        <div className='w-full h-[80px] drop-shadow-2xl flex bg-secondary text-primary'>
            <img src="/logo2.png" alt="logo" className='h-auto w-[170px] cursor-pointer object-cover ' onClick={
                ()=>{
                    navigate('/')
                }
            } />
            <div className='h-full w-[calc(100%-190px)] flex items-center justify-center gap-10 text-xl  font-bold'>
                <Link to="/" className="block p-4  ">Home</Link>
                <Link to="/products" className="block p-4 ">Products</Link>
                <Link to="/contact" className="block p-4 ">Contact</Link>
                <Link to="/about" className="block p-4 ">About</Link>
            </div>
            <div className='h-full w-[95px]  flex items-center justify-center  font-bold'>Profile</div>
        </div>
    )
}
