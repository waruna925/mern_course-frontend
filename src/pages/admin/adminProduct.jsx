import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleProducts";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";
import EditProductPage from "./editProductPage";
import toast from "react-hot-toast";
import Modal from 'react-modal';

// Set modal root element for accessibility
Modal.setAppElement('#root');

export default function AdminProduct() {
    const [products, setProducts] = useState(sampleProducts);
    const [isLoading, setIsLoading] = useState(true);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios.get("http://localhost:5000/api/products").then((res) => {
                console.log(res.data);
                setProducts(res.data);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

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

    const currentProduct = products[activeProduct];

    // Inline style overrides for react-modal overlay & content layout
    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            position: 'relative',
            inset: 'auto',
            width: '100%',
            maxWidth: '650px',
            padding: '0',
            border: 'none',
            borderRadius: '16px',
            overflow: 'hidden',
        }
    };

    return (
        <div className="relative w-full h-full bg-primary rounded-xl shadow-lg overflow-y-auto p-6">

            <Link
                to="/admin/add-product"
                className="fixed right-8 bottom-8 bg-accent text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300 z-10"
            >
                + Add Product
            </Link>

            {!isLoading ? (
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                    
                    {/* Styled Product Details Modal */}
                    <Modal
                        isOpen={isModelOpen}
                        onRequestClose={() => setIsModelOpen(false)}
                        style={modalStyles}
                        contentLabel="Product Details"
                    >
                        {currentProduct && (
                            <div className="bg-white text-gray-800">
                                {/* Modal Header */}
                                <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-100">
                                    <h3 className="text-xl font-bold text-secondary">Product Specifications</h3>
                                    <button 
                                        onClick={() => setIsModelOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                </div>

                                {/* Modal Body Layout */}
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
                                    {/* Product Image Section */}
                                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <img
                                            src={currentProduct.images?.[0]}
                                            alt={currentProduct.name}
                                            className="w-full max-h-56 object-contain rounded-lg mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Product Meta Section */}
                                    <div className="flex flex-col justify-between space-y-4">
                                        <div>
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                                                ID: {currentProduct.productId}
                                            </span>
                                            <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
                                                {currentProduct.name}
                                            </h2>
                                        </div>

                                        <div className="border-t border-b border-gray-100 py-3 my-2">
                                            <div className="flex items-baseline justify-between mb-2">
                                                <span className="text-sm text-gray-500">Price:</span>
                                                <span className="text-2xl font-bold text-accent">Rs. {currentProduct.price}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">Stock Available:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    currentProduct.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {currentProduct.stock} units
                                                </span>
                                            </div>
                                        </div>

                                        {currentProduct.description && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500 mb-1">Description:</h4>
                                                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                                    {currentProduct.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Footer Actions */}
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setIsModelOpen(false);
                                            navigate("/admin/edit-product", { state: currentProduct });
                                        }}
                                        className="flex items-center gap-2 bg-accent hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        <FaEdit /> Edit Details
                                    </button>
                                    <button
                                        onClick={() => setIsModelOpen(false)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>

                    {/* Desktop/Tablet Product Management Table */}
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
                                    onClick={() => {
                                        setIsModelOpen(true);
                                        setActiveProduct(index);
                                    }}
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                                >
                                    <td className="py-4 px-3 text-center">
                                        {product.productId}
                                    </td>

                                    <td className="py-4 px-3 font-medium text-secondary">
                                        {product.name}
                                    </td>

                                    <td className="py-4 px-3">
                                        <img
                                            src={product.images?.[0]}
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
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents modal from popping up
                                                    deleteProduct(product.productId);
                                                }}
                                                className="text-red-500 hover:text-red-700 transition-all"
                                            >
                                                <FaTrashAlt />
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents modal from popping up
                                                    navigate("/admin/edit-product", {
                                                        state: product,
                                                    });
                                                }}
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