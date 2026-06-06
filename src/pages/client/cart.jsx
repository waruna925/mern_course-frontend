import { useState } from "react";
import { getCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";

export default function Cart() {
    const [cart, setCart] = useState(getCart());

    return (
        <div className="w-full flex flex-col items-center py-6 bg-gray-100 min-h-screen">
            {
                cart.map((item) => {
                    return (
                        <div
                            key={item.product.productId}
                            className="relative w-[600px] h-[120px] bg-white rounded-xl shadow-lg flex items-center mb-5 overflow-visible"
                        >
                            {/* Product Image */}
                            <img
                                src={item.product.images?.[0]}
                                alt={item.product.name}
                                className="w-[120px] h-[120px] object-cover rounded-l-xl"
                            />

                            {/* Product Details */}
                            <div className="flex flex-col w-[260px] h-full items-start justify-evenly px-8">
                                <h1 className="text-md font-bold">
                                    {item.product.name}
                                </h1>

                                <p>{item.product.productId}</p>

                                <div className="flex">
                                    <p className="text-md font-semibold line-through mr-2">
                                        ${item.product.labelledPrice}
                                    </p>

                                    <p className="text-md font-semibold text-accent">
                                        ${item.product.price}
                                    </p>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="w-[100px] h-full flex items-center justify-center px-4">
                                <button>
                                    <BiPlus />
                                </button>

                                <p className="mx-4 text-black">
                                    {item.qty}
                                </p>

                                <button>
                                    <BiMinus />
                                </button>
                            </div>

                            {/* Total */}
                            <div className="w-[120px] h-full flex items-center justify-center px-4">
                                <p className="text-md font-semibold text-accent">
                                    ${item.product.price * item.qty}
                                </p>
                            </div>

                            {/* Trash Button */}
                            <button className="absolute -right-10 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110">
                                <BiTrash size={18} />
                            </button>
                        </div>
                    );
                })
            }
        </div>
    );
}