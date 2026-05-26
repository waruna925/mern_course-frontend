import { useState } from "react"
import mediaUpload from "../utils/supaBase"

export default function Counter() {

    const [image, setImage] = useState(null)

    function imageUpload() {

        if (image == null) {
            alert("Please select an image")
            return
        }
        mediaUpload(image).then(
            (res)=>{
                console.log("Image uploaded successfully:", res)
            }
        ).catch((err)=>{
            console.log("Error uploading image:", err)
        })
    }

    return (
        <div className="w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col gap-8 items-center justify-center transition-all back">

            <div className="w-[420px] h-[350px] rounded-3xl flex flex-col gap-8 items-center justify-center border-2 border-gray-700 bg-white/5 backdrop-blur-xl">

                <h1 className="text-4xl text-white font-bold">
                    Upload Image
                </h1>

                <label
                    htmlFor="fileInput"
                    className="border-2 border-dashed flex flex-col items-center justify-center w-[300px] h-[180px] rounded-4xl text-white cursor-pointer"
                >

                    <span className="text-lg font-semibold">
                        Click to Upload
                    </span>

                    <span className="text-sm text-gray-300 mt-2">
                        PNG, JPG, JPEG
                    </span>

                    {
                        image && (
                            <span className="text-green-400 text-sm mt-3">
                                {image.name}
                            </span>
                        )
                    }

                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}
                    />

                </label>

            </div>

            <button
                onClick={imageUpload}
                className="bg-blue-500 hover:bg-blue-700 rounded-xl text-white font-bold py-2 px-4 transition"
            >
                Upload
            </button>

        </div>
    )
}