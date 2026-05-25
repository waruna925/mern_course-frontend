import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleProducts"
import axios from "axios"

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
        <div className="w-full h-full  border-8 border-black  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
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
                                    <td><img src={product.images} alt="img" className="w-[100px] h-[100px]"/></td>
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