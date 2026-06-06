import axios from "axios"
import { useEffect, useState } from "react"
import Card from "../../components/card"


export default function Product(){
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        ()=>{
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
                        setProduct(res.data)
                        setIsLoading(false)
                    }
                )
            }
        },[isLoading]
    )

    return(
        <div className="w-full h-full flex items-center justify-center gap-10 flex-wrap py-10 bg-primary"> 
            {
                product.map(
                    (prod) => (
                        <Card key={prod._id} product={prod} />
                    )
                )
            }
        </div>
    )
}