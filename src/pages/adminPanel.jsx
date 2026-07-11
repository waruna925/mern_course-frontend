import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminProduct from "./admin/adminProduct";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrderPage from "./admin/adminOrderPage";
import Loading from "../components/loading";

export default function AdminPanel() {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/get-user`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.data.role !== "admin") {
                    toast.error("You are not authorized", {
                        id: "admin-unauthorized",
                    });
                    navigate("/", { replace: true });
                    return;
                }

                setStatus("authorized");
            } catch (err) {
                console.log(err);
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
        };

        checkAdmin();
    }, []);

    function getClass(name) {
        return path.includes(name)
            ? "bg-accent text-black"
            : "text-white";
    }

    function getTitle() {
        if (path.includes("products")) return "PRODUCTS";
        if (path.includes("users")) return "USERS";
        if (path.includes("orders")) return "ORDERS";
        if (path.includes("reviews")) return "REVIEWS";
        if (path.includes("add-product")) return "ADD PRODUCT";
        if (path.includes("edit-product")) return "EDIT PRODUCT";
        return "ADMIN PANEL";
    }

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "unauthorized") {
        return null;
    }

    return (
        <div className="w-full h-screen flex bg-primary">
            {/* Sidebar */}
            <div className="w-[280px] h-full bg-secondary text-primary shadow-lg">
                <div className="p-6 border-b border-accent">
                    <h1 className="text-2xl font-bold text-accent">
                        Admin Panel
                    </h1>
                    <p className="text-sm opacity-70">
                        Dashboard Management
                    </p>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <Link
                        to="/admin/products"
                        className={`${getClass("products")} p-4 rounded-lg hover:bg-accent/25 transition`}
                    >
                        PRODUCTS
                    </Link>

                    <Link
                        to="/admin/users"
                        className={`${getClass("users")} p-4 rounded-lg hover:bg-accent/25 transition`}
                    >
                        USERS
                    </Link>

                    <Link
                        to="/admin/orders"
                        className={`${getClass("orders")} p-4 rounded-lg hover:bg-accent/25 transition`}
                    >
                        ORDERS
                    </Link>

                    <Link
                        to="/admin/reviews"
                        className={`${getClass("reviews")} p-4 rounded-lg hover:bg-accent/25 transition`}
                    >
                        REVIEWS
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <div className="h-16 bg-white shadow-md flex items-center justify-between px-8">
                    <h2 className="text-2xl font-semibold text-secondary">
                        {getTitle()}
                    </h2>

                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                        A
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-auto bg-primary">
                    <Routes>
                        <Route path="/products" element={<AdminProduct />} />
                        <Route path="/users" element={<h1>Users</h1>} />
                        <Route path="/orders" element={<AdminOrderPage />} />
                        <Route path="/reviews" element={<h1>Reviews</h1>} />
                        <Route path="/add-product" element={<AddProductPage />} />
                        <Route path="/edit-product" element={<EditProductPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}