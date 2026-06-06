import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleProducts"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import EditProductPage from "./editProductPage";
import toast from "react-hot-toast";

export default function AdminProduct() {
    const [products, setProducts] = useState(sampleProducts)
    const [isLoading, setIsLoading] = useState(true)
    const navigate=useNavigate()

    useEffect(
        () => {
            if(isLoading){

            axios.get("http://localhost:5000/api/products").then(
                (res) => {
                    console.log(res.data)
                    setProducts(res.data)
                    setIsLoading(false)
                }
            )
        }
        }, [isLoading]
    );

    async function deleteProduct(productId) {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login to delete a product");
                return;
            }

            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Product deleted successfully");
            setIsLoading(true);
        } catch (err) {
            console.log(err);
            toast.error("Error deleting product");
        }
    }

    return (
        <div className="relative w-full h-full  border-8 border-black  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pb-18">
            <Link to="/admin/add-product" className=" fixed right-6 bottom-6 bg-blue-500 text-white py-2 px-4 font-bold rounded-md">+ Add Product</Link>
            {!isLoading ?
                <table className="w-full text-center  border border-black">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Labeled Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="border border-secondary">
                    {products.map(
                        (product, index) => {
                            return (
                                <tr key={index} className="border border-black">
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td><img src={product.images[0]} alt="img" className="w-[150px] h-auto mx-auto my-auto p-1.5" /></td>
                                    <td>{product.labeledPrice}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <div className="flex justify-center items-center gap-3 cursor-pointer">
                                            <FaTrashAlt onClick={
                                                ()=>{
                                                    deleteProduct(product.productId)
                                                }
                                            } className="text-red-500"/>
                                            <FaEdit onClick={
                                                ()=>{
                                                    navigate("/admin/edit-product",{
                                                        state:product
                                                    })
                                                }
                                            }
                                             className="text-blue-500"/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            : <div className="w-full h-full flex items-center justify-center"><div className="w-[50px] h-[50px] border-4 border-t-amber-200 rounded-full animate-spin"></div>
            </div>
            }
            
        </div>
    )
}