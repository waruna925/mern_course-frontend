import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";

export default function AdminOrderPage() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(isLoading){
            const token=localStorage.getItem("token")
            if(!token){
                toast.error("Please login to view orders")
                return
            }
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
                console.log(res.data)
                setOrders(res.data)
                setIsLoading(false)
            }).catch((err)=>{
                console.log(err)
                toast.error("Something went wrong")
            })
        }
    })
    return (
    <div className="w-full h-full max-h-full overflow-auto p-6">

        {
            isLoading ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">

                    <table className="w-full">
                        <thead>
                            <tr className="bg-secondary text-primary">
                                <th className="py-4 px-3 text-left">ID</th>
                                <th className="py-4 px-3 text-left">Name</th>
                                <th className="py-4 px-3 text-left">Address</th>
                                <th className="py-4 px-3 text-left">Phone</th>
                                <th className="py-4 px-3 text-left">Email</th>
                                <th className="py-4 px-3 text-left">Date</th>
                                <th className="py-4 px-3 text-center">Total</th>
                                <th className="py-4 px-3 text-center">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-green-50 transition-all duration-200"
                                >
                                    <td className="py-4 px-3">{order.orderId}</td>

                                    <td className="py-4 px-3 font-medium text-secondary">
                                        {order.name}
                                    </td>

                                    <td className="py-4 px-3 max-w-[250px]">
                                        {order.address}
                                    </td>

                                    <td className="py-4 px-3">
                                        {order.pNumber}
                                    </td>

                                    <td className="py-4 px-3">
                                        {order.email}
                                    </td>

                                    <td className="py-4 px-3">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>

                                    <td className="py-4 px-3 text-center font-semibold text-accent">
                                        Rs. {order.totalAmount}
                                    </td>

                                    <td className="py-4 px-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium
                                                ${
                                                    order.status === "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : order.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )
        }

    </div>
);
}