import { Link, Route, Routes } from "react-router-dom";
import Home from "./home";

export default function AdminPanel(){
    return(
        <>
            <div className="w-full h-screen  bg-red-500 flex flex-row">
                <div className="h-screen w-[300px] bg-amber-300">
                    <Link to="/admin/products" className="block p-4 text-black hover:bg-amber-500">Products</Link>
                    <Link to="/admin/users" className="block p-4 text-black hover:bg-amber-500">Users</Link>
                    <Link to="/admin/orders" className="block p-4 text-black hover:bg-amber-500">Orders</Link>
                    <Link to="/admin/reviews" className="block p-4 text-black hover:bg-amber-500">Reviews</Link>
                </div>
                <div className="h-screen w-[calc(100%-300px)] bg-blue-400">
                    <Routes path="/">   
                        <Route path="/products" element={<h1 className="text-5xl text-white text-center">Products</h1>} />
                        <Route path="/users" element={<h1 className="text-5xl text-white text-center">Users</h1>} />
                        <Route path="/orders" element={<h1 className="text-5xl text-white text-center">Orders</h1>} />
                        <Route path="/reviews" element={<h1 className="text-5xl text-white text-center">Reviews</h1>} />
                    </Routes>
                </div>
            </div>
        </>
    )
}