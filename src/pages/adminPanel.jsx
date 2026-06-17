import { Link, Route, Routes, useLocation } from "react-router-dom";
import AdminProduct from "./admin/adminProduct";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrderPage from "./admin/adminOrderPage";

export default function AdminPanel() {

    const location=useLocation()
    const path=location.pathname

    function getClass(name){
        if(path.includes(name)){
            return "bg-accent text-400 text-black"
        }else{
            return "text-white"
        }
    }
    function getTitle(){
        if(path.includes("products")){
            return "PRODUCTS"
        }else if(path.includes("users")){
            return "USERS"
        }else if(path.includes("orders")){
            return "ORDERS"
        }else if(path.includes("reviews")){
            return "REVIEWS"
        }
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
                className={`${getClass("products")} p-4 rounded-lg hover:bg-accent/25 hover:text-white transition-all duration-300`}
            >
                PRODUCTS
            </Link>

            <Link
                to="/admin/users"
                className={`${getClass("users")} p-4 rounded-lg hover:bg-accent/25 hover:text-white transition-all duration-300`}
            >
                USERS
            </Link>

            <Link
                to="/admin/orders"
                className={`${getClass("orders")} p-4 rounded-lg hover:bg-accent/25 hover:text-white transition-all duration-300`}
            >
                ORDERS
            </Link>

            <Link
                to="/admin/reviews"
                className={`${getClass("reviews")} p-4 rounded-lg hover:bg-accent/25 hover:text-white transition-all duration-300`}
            >
                REVIEWS
            </Link>

        </div>

    </div>

    {/* Content Area */}
    <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="h-16 bg-white shadow-md flex items-center justify-between px-8">
            <h2 className="text-2xl font-semibold text-secondary">
                {getTitle()}
            </h2>

            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                A
            </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-primary overflow-auto">
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