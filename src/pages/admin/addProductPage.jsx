import { useState } from "react"
import mediaUpload from "../../utils/supaBase"
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProductPage(){
    
    const [productId, setProductId] = useState("")
    const [productName, setProductName] = useState("")
    const [altNames, setAltNames] = useState("")
    const [description, setDescription] = useState("")
    const [labelledPrice, setLabelledPrice] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productStock, setProductStock] = useState("")
    const [images, setImages] = useState([])
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false)


    async function addProduct(e) {
        const token=localStorage.getItem("token")
        if (!token) {
            alert("Please login to add a product")
            return
        }

        if(images.length===0){
            alert("Please upload at least one image")
            return
        }
        setLoading(true)
        const promiseArray =[]
        for(let i=0;i<images.length;i++){
            promiseArray[i]=mediaUpload(images[i])
        }
        try {
            const imageUrls=await Promise.all(promiseArray)
            console.log("Image URLs:", imageUrls)
            const altNamesArray=altNames.split(",").map((name)=>name.trim())

            const product={
                productId:productId,
                name:productName,
                altNames:altNamesArray,
                description:description,
                images:imageUrls,
                labelledPrice:Number(labelledPrice),
                price:Number(productPrice),
                stock:Number(productStock)
            }
            const res=await axios.post(
                import.meta.env.VITE_BACKEND_URL+"/api/products/",
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then(
                (res)=>{
                    toast.success("Product added successfully")
                    console.log(res.data)
                    navigate("/admin/products")
                }
            ).catch((err)=>{
                toast.error(err.response?.data?.message || "Error adding product")
                console.log(err)
            })

        } catch (error) {
            console.error("Error uploading images:", error)
        }

    }

    return(
        <div className="w-full h-full bg-black flex items-start justify-center overflow-y-auto p-10">

    <div className="w-[450px] rounded-3xl flex flex-col  justify-center items-center border-2 border-gray-700 bg-white/5 backdrop-blur-xl p-10  gap-2">

        <h1 className="text-4xl text-white font-bold mb-4">
            Add Product
        </h1>

        {/* Product ID */}
        <label htmlFor="productId" className="text-white self-start ml-[55px]">
            Product Id :
        </label>

        <input
            type="text"
            id="productId"
            className="border-2 border-gray-700 rounded-md p-2 w-[300px] bg-black/30 text-white outline-none"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
        />

        {/* Product Name */}
        <label htmlFor="productName" className="text-white self-start ml-[55px]">
            Product Name :
        </label>

        <input
            type="text"
            id="productName"
            className="border-2 border-gray-700 rounded-md p-2 w-[300px] bg-black/30 text-white outline-none"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
        />

        {/* Alt Names */}
        <label htmlFor="altNames" className="text-white self-start ml-[55px]">
            Product Alt Names :
        </label>

        <input
            type="text"
            id="altNames"
            placeholder="Comma separated"
            className="border-2 border-gray-700 rounded-md p-2 w-[300px] bg-black/30 text-white outline-none"
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
        />

        {/* Description */}
        <label htmlFor="description" className="text-white self-start ml-[55px]">
            Product Description :
        </label>

        <textarea
            id="description"
            className="border-2 border-gray-700 rounded-md p-2 w-[300px] h-[100px] bg-black/30 text-white outline-none resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Label Price */}
        <label htmlFor="labelledPrice" className="text-white self-start ml-[55px]">
            Labelled Price :
        </label>

        <input
            type="number"
            id="labelledPrice"
            className="border-2 border-gray-700 rounded-md p-2 w-[300px] bg-black/30 text-white outline-none"
            value={labelledPrice}
            onChange={(e) => setLabelledPrice(e.target.value)}
        />

        {/* Product Price */}
        <label htmlFor="productPrice" className="text-white self-start ml-[55px]">
            Product Price :
        </label>

        <input
            type="number"
            id="productPrice"
            className="border-2 border-gray-700 rounded-md p-2 w-[300px] bg-black/30 text-white outline-none"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
        />

        {/* Stock */}
        <label htmlFor="productStock" className="text-white self-start ml-[55px]">
            Product Stock :
        </label>

        <input
            type="number"
            id="productStock"
            className="border-2 border-gray-700 rounded-md p-2 w-[300px] bg-black/30 text-white outline-none"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
        />

        {/* Image Upload */}
        <label
            htmlFor="fileInput"
            className="border-2 border-dashed flex flex-col items-center justify-center w-[300px] h-[180px] rounded-3xl text-white cursor-pointer hover:bg-white/10 transition mt-4"
        >

            <span className="text-lg font-semibold">
                Click to Upload Product Image
            </span>

            <span className="text-sm text-gray-300 mt-2">
                PNG, JPG, JPEG
            </span>

            <input
                id="fileInput"
                type="file"
                className="hidden"
                multiple
                onChange={
                    (e)=>{
                        setImages(Array.from(e.target.files))
                    }
                }
            />

        </label>

        {/* Button */}
        <button
    onClick={addProduct}
    disabled={loading}
    className="
    bg-blue-500 hover:bg-blue-700
    transition-all duration-300
    text-white py-2 px-6
    font-bold rounded-xl mt-4
    flex items-center justify-center gap-2
    min-w-[160px]
    disabled:opacity-70
    "
>

    {
        loading ? (
            <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Product...
            </>
        ) : (
            "Add Product"
        )
    }

</button>

    </div>

</div>
    )
}

// {
//         productId:{
//             type:String,
//             required:true,
//             unique:true
//         },
//         name:{
//             type:String,
//             required:true
//         },
//         altNames:[
//             {type:String}
//         ],
//         description:{
//             type:String,
//             required:true
//         },
//         images:[
//             {type:String}
//         ],
//         labelledPrice:{
//             type:Number,
//             required:true
//         },
//         price:{
//             type:Number,
//             required:true
//         },
//         stock:{
//             type:Number,
//             required:true
//         },
//         isAvailable:{
//             type:Boolean,
//             required:true,
//             default:true
//         },
        
//     }