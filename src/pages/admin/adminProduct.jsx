import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleProducts"
import axios from "axios"
import { Link } from "react-router-dom";

export default function AdminProduct(){
    const [products, setProducts] = useState(sampleProducts)
    useEffect(
        ()=>{
            axios.get("http://localhost:5000/api/products").then(
        (res)=>{
            console.log(res.data)
            setProducts(res.data)
        }

    )
        },[]
    );
    

    return(
        <div className="relative w-full h-full  border-8 border-black  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            <Link to="/admin/add-product"  className=" fixed right-6 bottom-6 bg-blue-500 text-white py-2 px-4 font-bold rounded-md">+ Add Product</Link>
            <table className="w-full text-center  border border-black">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Labeled Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody className="border border-black">
                    {products.map(
                        (product,index)=>{
                            return(
                                <tr key={index} className="border border-black">
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td><img src={product.images[0]} alt="img" className="w-[150px] h-auto"/></td>
                                    <td>{product.labeledPrice}</td>
                                    <td>{product.stock}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}