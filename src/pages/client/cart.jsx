import { useState } from "react";
import { addToCart, getCart, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(getCart());

    return (
    <div className="w-full flex flex-col items-center justify-start pt-4 pb-32 bg-gray-100 min-h-[calc(100vh-80px)] px-4">
        {
            cart.map((item) => {
                return (
                    <div
                        key={item.product.productId}
                        className="w-full max-w-[600px] bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center mb-5 relative p-4 md:p-0 overflow-hidden border border-gray-100"
                    >
                        {/* Product Image */}
                        <img
                            src={item.product.images?.[0]}
                            alt={item.product.name}
                            /* FIX: Responsive sizing. Image occupies full width on mobile, scales to explicit square block on desktop screens */
                            className="w-full h-full max-w-[420px] md:w-[120px] md:h-[120px] object-cover rounded-lg mx-2"
                        />

                        {/* Info Container Wrapper */}
                        <div className="flex flex-col md:flex-1 w-full p-4 md:p-5 gap-4">
                            
                            {/* Top row inside info container: Details & Total */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                                {/* Product Details */}
                                <div className="flex flex-col text-center sm:text-left w-full sm:w-auto">
                                    <h1 className="text-base font-bold text-gray-800 line-clamp-1">
                                        {item.product.name}
                                    </h1>
                                    <p className="text-xs text-gray-400 mt-0.5">ID: {item.product.productId}</p>

                                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                        <p className="text-sm font-semibold text-gray-400 line-through">
                                            ${item.product.labelledPrice}
                                        </p>
                                        <p className="text-base font-bold text-accent">
                                            ${item.product.price}
                                        </p>
                                    </div>
                                </div>

                                {/* Line Item Calculated Total */}
                                <div className="flex items-center justify-center font-bold text-lg text-gray-900 sm:min-w-[80px]">
                                    ${item.product.price * item.qty}
                                </div>
                            </div>

                            {/* Bottom row inside info container: Quantity Controls & Delete Button */}
                            {/* FIX: Combined actions row to force the delete action to sit neatly at the bottom-right */}
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
                                {/* Quantity Adjustment Controls */}
                                <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1 border border-gray-200">
                                    <button 
                                        onClick={() => {
                                            addToCart(item.product, -1)
                                            setCart(getCart)
                                        }}
                                        className="p-1.5 text-gray-500 hover:text-black transition-colors"
                                    >
                                        <BiMinus />
                                    </button>

                                    <p className="mx-4 font-bold text-gray-800 min-w-[20px] text-center">
                                        {item.qty}
                                    </p>

                                    <button 
                                        onClick={() => {
                                            addToCart(item.product, 1)
                                            setCart(getCart)
                                        }}
                                        className="p-1.5 text-gray-500 hover:text-black transition-colors"
                                    >
                                        <BiPlus />
                                    </button>
                                </div>

                                {/* Trash Button */}
                                {/* FIX: Placed cleanly inside the row space layout flow at the bottom right */}
                                <button 
                                    onClick={() => {
                                        removeFromCart(item.product.productId)
                                        setCart(getCart)
                                    }} 
                                    className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                                >
                                    <BiTrash size={16} />
                                    <span className="sm:inline text-xs">Remove</span>
                                </button>
                            </div>

                        </div>
                    </div>
                );
            })
        }

        {/* Footer Checkout Bar */}
        <div className="w-full bg-white shadow-2xl fixed bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-4 sm:gap-10 py-4 px-6 border-t border-gray-200 z-40">
            <div className="flex flex-col items-center sm:items-start">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    Items
                </p>
                <p className="text-xl sm:text-2xl font-black text-secondary">
                    {cart.reduce((sum, item) => sum + item.qty, 0)}
                </p>
            </div>

            <div className="flex flex-col items-center sm:items-start">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    Total
                </p>
                <p className="text-xl sm:text-3xl font-black text-accent">
                    ${cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)}
                </p>
            </div>

            <Link 
                to="/checkout" 
                state={{ cart: cart }} 
                className="bg-secondary text-primary px-6 sm:px-10 py-3 rounded-xl font-bold hover:bg-accent hover:text-white shadow-md active:scale-95 transition-all text-sm sm:text-base ml-auto sm:ml-0"
            >
                Checkout
            </Link>
        </div>
    </div>
);
}