import { useState } from "react";
import { addToCart, getCart, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(getCart());

    return (
        <div className="w-full flex flex-col items-center pt-4 pb-30 bg-gray-100 min-h-[calc(100vh-80px)] ">
            {
                cart.map((item) => {
                    return (
                        <div
                            key={item.product.productId}
                            className=" w-[600px] h-[120px] bg-white rounded-xl shadow-lg flex items-center mb-5 overflow-visible"
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
                                <button onClick={() => {
                                    addToCart(item.product, 1)
                                    setCart(getCart)
                                }}>
                                    <BiPlus />
                                </button>

                                <p className="mx-4 text-black">
                                    {item.qty}
                                </p>

                                <button onClick={() => {
                                    addToCart(item.product, -1)
                                    setCart(getCart)
                                }}>
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
                            <button onClick={() => {
                                removeFromCart(item.product.productId)
                                setCart(getCart)
                            }} className="absolute -right-10 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110">
                                <BiTrash size={18} />
                            </button>


                        </div>

                    );
                })
            }
            <div className="w-full h-[100px] bg-white shadow-xl  fixed bottom-0 flex items-center justify-center gap-10 px-8 border border-gray-200">

                <div className="flex flex-col">
                    <p className="text-sm text-gray-500">
                        Total Items
                    </p>
                    <p className="text-2xl font-bold text-secondary">
                        {cart.reduce((sum, item) => sum + item.qty, 0)}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500">
                        Total Amount
                    </p>
                    <p className="text-3xl font-bold text-accent">
                        $
                        {cart.reduce(
                            (sum, item) => sum + item.product.price * item.qty,
                            0
                        )}
                    </p>
                </div>

                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="bg-secondary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-accent hover:text-white transition-all">
                Checkout
                </Link>

        </div>
        </div >
    );
}