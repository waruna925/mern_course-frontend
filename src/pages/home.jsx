import Header from "../components/header";
import { Routes, Route } from "react-router-dom";
import Product from "./client/product";

export default function Home(){
    return(
        <>
        <Header />
            <div className="w-full h-calc(100vh-80px) flex flex-col items-center justify-center gap-10">
                <Routes>
                    <Route path="/" element={< h1>Home</h1>} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/contact" element={<h1>contact</h1>} />
                    <Route path="/about" element={<h1>about</h1>} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </div>
        </>
    )
}