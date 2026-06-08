import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function CheckOut() {

    const location = useLocation()
    const [cart, setCart] = useState(location.state.cart);
    const [phoneNumber,setPhoneNumber]=useState("")
    const [address,setAddress]=useState("")


    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index)
        setCart(newCart)
    }
    function changeQty(index, qty) {
        const newCart = [...cart]
        if (qty <= 0) {
            removeFromCart(index)
        } else {
            newCart[index].qty = qty
            setCart(newCart)
        }
    }

    async function placeOrder() {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("please login to place order")
            return
        }
        const orderInfo = {
            product: [],
            pNumber: phoneNumber,
            address: address

        }
        for (let i = 0; i < cart.length; i++) {
            const item = {
                productId: cart[i].product.productId,
                qty: cart[i].qty
            }
            orderInfo.product.push(item)
        }
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", orderInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            toast.success("Order placed successfully")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }



    }


    return (
        <div className="w-full flex flex-col items-center pt-4 pb-30 bg-gray-100 min-h-[calc(100vh-80px)] relative">
            {
                cart.map((item, index) => {
                    return (
                        <div
                            key={item.productId}
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
                                <button onClick={() => {
                                    changeQty(index, item.qty + 1)
                                }}>
                                    <BiPlus />
                                </button>

                                <p className="mx-4 text-black">
                                    {item.qty}
                                </p>

                                <button onClick={() => {
                                    changeQty(index, item.qty - 1)
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
                                removeFromCart(index)
                            }} className="absolute -right-10 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110">
                                <BiTrash size={18} />
                            </button>


                        </div>

                    );
                })
            }
            <div className="w-full h-[120px] bg-white shadow-xl fixed bottom-0 flex items-center justify-center gap-6 px-8 border border-gray-200">

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

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <input
                    type="text"
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <button
                    onClick={placeOrder}
                    className="bg-secondary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-accent hover:text-white transition-all"
                >
                    Place Order
                </button>

            </div>
        </div>
    );
}