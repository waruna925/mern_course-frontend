import { useState } from "react"

export default function ImageSlider(props){
    const images=props.images
    const [currentIndex, setCurrentIndex] = useState(0)
    return(
        <div className="w-[500px] h-[600px] ">
            <img src={images[currentIndex]} alt="" className="w-full h-[500px] object-cover rounded-2xl"/>
            <div className="w-full h-[100px]  flex justify-center items-center flex-row scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-x-auto overflow-y-hidden">
                {
                    images.map(
                        (img,index)=>{
                            return(
                                <img key={index} className={"w-[90px] h-[80px] m-2 rounded object-cover cursor-pointer "+(index==currentIndex && " border-4 border-accent") } src={img} alt="" onClick={()=>{
                                    setCurrentIndex(index)
                                }} />
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}