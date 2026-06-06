import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import ImageSlider from "./imageSlider"

export default function ProductOverview() {
    const params = useParams()
    const [status, setStatus] = useState("loading")//loading,success,error
    const productId = params.id
    const [product, setProduct] = useState(null)
    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then(
                (response) => {
                    console.log(response.data)
                    setProduct(response.data)
                    setStatus("success")
                }
            ).catch(
                (err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                    setStatus("error")
                })
        }, [productId]
    )
    return (
        <>
            {status === "success" && product &&
    <div className="w-full h-full flex items-center justify-center">
        
        {/* LEFT IMAGE */}
        <div className="w-[50%] min-h-[calc(100vh-80px)] flex items-center justify-center bg-primary">
            <ImageSlider images={product.images} />
        </div>

        {/* RIGHT DETAILS */}
        <div className="w-[50%] min-h-[calc(100vh-80px)] flex flex-col justify-center px-10 bg-primary">

            {/* TITLE */}
            <h1 className="text-center font-bold text-4xl leading-snug">
                {product.name}
                {product.altNames.map((altName, index) => (
                    <span key={index} className="text-xl text-gray-500 font-normal">
                        {" | " + altName}
                    </span>
                ))}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-center text-gray-600 text-lg mt-4 leading-relaxed">
                {product.description}
            </p>

            {/* PRICING */}
            <div className="flex items-center justify-center gap-6 mt-6">
                <span className="text-2xl font-semibold text-gray-400 line-through">
                    ${product.labelledPrice}
                </span>
                <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                </span>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-8">
                <button className="bg-black text-white py-2.5 px-6 rounded-xl hover:bg-gray-800 transition">
                    Add to Cart
                </button>

                <button className="bg-green-600 text-white py-2.5 px-6 rounded-xl hover:bg-green-700 transition">
                    Buy Now
                </button>
            </div>

        </div>
    </div>
}
            {
                status === "loading" &&
                <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-t-orange-400 rounded-full animate-spin border-secondary"></div>
                </div>
            }
        </>

    )
}