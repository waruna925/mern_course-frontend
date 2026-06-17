import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleProducts"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import EditProductPage from "./editProductPage";
import toast from "react-hot-toast";

export default function AdminProduct() {
    const [products, setProducts] = useState(sampleProducts)
    const [isLoading, setIsLoading] = useState(true)
    const navigate=useNavigate()

    useEffect(
        () => {
            if(isLoading){

            axios.get("http://localhost:5000/api/products").then(
                (res) => {
                    console.log(res.data)
                    setProducts(res.data)
                    setIsLoading(false)
                }
            )
        }
        }, [isLoading]
    );

    async function deleteProduct(productId) {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login to delete a product");
                return;
            }

            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Product deleted successfully");
            setIsLoading(true);
        } catch (err) {
            console.log(err);
            toast.error("Error deleting product");
        }
    }

    return (
  <div className="relative w-full h-full bg-primary rounded-xl shadow-lg overflow-y-auto p-6">

    <Link
      to="/admin/add-product"
      className="fixed right-8 bottom-8 bg-accent text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
    >
      + Add Product
    </Link>

    {!isLoading ? (
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary text-primary">
              <th className="py-4 px-3">Product ID</th>
              <th className="py-4 px-3">Product Name</th>
              <th className="py-4 px-3">Image</th>
              <th className="py-4 px-3">Price</th>
              <th className="py-4 px-3">Stock</th>
              <th className="py-4 px-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-green-50 transition-all duration-200"
              >
                <td className="py-4 px-3 text-center">
                  {product.productId}
                </td>

                <td className="py-4 px-3 font-medium text-secondary">
                  {product.name}
                </td>

                <td className="py-4 px-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg mx-auto border"
                  />
                </td>

                <td className="py-4 px-3 text-center font-semibold text-accent">
                  Rs. {product.price}
                </td>

                <td className="py-4 px-3 text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {product.stock}
                  </span>
                </td>

                <td className="py-4 px-3">
                  <div className="flex justify-center gap-4 text-xl">

                    <button
                      onClick={() => deleteProduct(product.productId)}
                      className="text-red-500 hover:text-red-700 transition-all"
                    >
                      <FaTrashAlt />
                    </button>

                    <button
                      onClick={() =>
                        navigate("/admin/edit-product", {
                          state: product,
                        })
                      }
                      className="text-accent hover:text-green-700 transition-all"
                    >
                      <FaEdit />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}
  </div>
);
}